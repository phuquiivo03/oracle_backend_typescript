import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { decodeSuiPrivateKey, encodeSuiPrivateKey } from '@mysten/sui.js/cryptography';
import { fromHEX } from '@mysten/sui.js/utils';
import { bcs } from '@mysten/sui.js/bcs';

let list_addresses: {[key: string]: string} = {}

type WeatherObject = {
    id: number,
    name: string,
    country: string,
    windSpeed: number,
    temp: number,
    humidity: number,
    cloud: number,
}

const package_id = "0x35364119aa41eb4e3a7291a1d681dfad45ec8de53bc07b2cc834fa04a847a4b2"
const weather_oracle = "0x7c5ba461de301b69bffd7093e0abed6862eec833ccbf058c30947626af5757f9"
const admin_cap = "0x00a9d5e31e50819ee153ebf189e7fd3c72449010478799e689e3387081afa2d8"
const private_key = "e9dba25e2c1999461f8cf27cf137d4218c9bc1fb425ea7c36a19b92cec0efe3b"
const rpcUrl = getFullnodeUrl('devnet');
const client = new SuiClient({ url: rpcUrl });
let keypair = new Ed25519Keypair();
keypair = Ed25519Keypair.fromSecretKey(fromHEX(private_key));

export const add_city_contract_call = async (
    cities: {
        id: number,
        name: string,
        lon: number,
        lat: number,
        country: string
    }[]
    )=> {
    const transaction_block = new TransactionBlock()
    cities.forEach(city => {
        transaction_block.moveCall({
            target: `${package_id}::weather::add_city`,
            arguments: [
                transaction_block.object(admin_cap),
                transaction_block.object(weather_oracle),
                transaction_block.pure.u32(city.id),
                transaction_block.pure.string(city.name),
                transaction_block.pure.string(city.country),
                transaction_block.pure.u32(city.lat),
                transaction_block.pure.bool(false),
                transaction_block.pure.u32(city.lon),
                transaction_block.pure.bool(false)
            ]
        })  
    })
    transaction_block.setGasBudget(100000000)
    let status =await client.signAndExecuteTransactionBlock(
        { 
            signer: keypair, 
            transactionBlock: transaction_block 
        });
    console.log(status)
}

export const update_weather_contract_call = async (
    cities: {
        id: number, 
        name: string, 
        lon: number, 
        lat: number, 
        country: string, 
        windSpeed: number, 
        temp: number, 
        humidity: number, 
        visibility: number
        cloud: number}[]
    )=> {
    const transaction_block = new TransactionBlock()
    transaction_block.setGasBudget(100000000)
    cities.forEach(city => {
        transaction_block.moveCall({
            target:`${package_id}::weather::update`,
            arguments: [
                transaction_block.object(admin_cap), 
                transaction_block.object(weather_oracle),
                transaction_block.pure.u32(city.id),
                transaction_block.pure.u16(1),
                transaction_block.pure.u32(city.temp),
                transaction_block.pure.u32(1),
                transaction_block.pure.u8(city.humidity),
                transaction_block.pure.u16(city.visibility),
                transaction_block.pure.u16(city.windSpeed),
                transaction_block.pure.u16(1),
                transaction_block.pure.u8(city.cloud),
                transaction_block.pure.u32(1000),
            ]
        })
    })
    let status =await client.signAndExecuteTransactionBlock(
        { 
            signer: keypair, 
            transactionBlock: transaction_block 
        });
    console.log(status)
}

//gas 100000000 

