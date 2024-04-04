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

const package_id = "0xcec636594c25ea30ff0cadcabf8d92e3e37aad966722e68fbaa63adc00b32a9b"
const weather_oracle = "0xd88aa2be6c001299004b1c22bb85cd45b0606e174e9a21ebdc5f36fbde7c3f6c"
const admin_cap = "0xda3c87f45f383de358e66dcd8de60a50d32c6b712480f255601c1ff977a65e78"
const private_key = "e9dba25e2c1999461f8cf27cf137d4218c9bc1fb425ea7c36a19b92cec0efe3b"
const rpcUrl = getFullnodeUrl('testnet');
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
                transaction_block.pure.u32(city.lon)
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
        wind_speed: number, 
        temp: number, 
        wind_deg: string, 
        rain_fall: string, 
        is_rain: boolean,
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
                transaction_block.pure.u32(city.temp),
                transaction_block.pure.u16(city.visibility),
                transaction_block.pure.u16(city.wind_speed),
                transaction_block.pure.string(city.wind_deg),
                transaction_block.pure.u8(city.cloud),
                transaction_block.pure.bool(city.is_rain),
                transaction_block.pure.string(city.rain_fall),
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

