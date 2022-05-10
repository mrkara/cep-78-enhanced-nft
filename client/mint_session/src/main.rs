#![no_std]
#![no_main]

#[cfg(not(target_arch = "wasm32"))]
compile_error!("target arch should be wasm32: compile with '--target wasm32-unknown-unknown'");

extern crate alloc;
use alloc::string::String;
use casper_contract::contract_api::{runtime};
use casper_types::{runtime_args, ContractHash, Key, RuntimeArgs};

const ENTRY_POINT_MINT: &str = "mint";

const ARG_NFT_CONTRACT_HASH: &str = "nft_contract_hash";
const ARG_KEY_NAME: &str = "key_name";
const ARG_TOKEN_OWNER: &str = "token_owner";
const ARG_TOKEN_META_DATA: &str = "token_meta_data";
const ARG_TOKEN_URI: &str = "token_uri";

#[no_mangle]
pub extern "C" fn call() {
    let nft_contract_hash: ContractHash = runtime::get_named_arg::<Key>(ARG_NFT_CONTRACT_HASH)
        .into_hash()
        .map(|hash| ContractHash::new(hash))
        .unwrap();
    let key_name: Option<String> = runtime::get_named_arg(ARG_KEY_NAME);

    let token_owner = runtime::get_named_arg::<Key>(ARG_TOKEN_OWNER);
    let token_metadata: String = runtime::get_named_arg(ARG_TOKEN_META_DATA);
    let token_uri: String = runtime::get_named_arg(ARG_TOKEN_URI);

    let owned_tokens_dictionary_key = runtime::call_contract::<Key>(
        nft_contract_hash,
        ENTRY_POINT_MINT,
        runtime_args! {
            ARG_TOKEN_OWNER => token_owner,
            ARG_TOKEN_META_DATA => token_metadata,
            ARG_TOKEN_URI =>token_uri
        },
    );

    if let Some(key_name) = key_name {
        runtime::put_key(&key_name, owned_tokens_dictionary_key);
    }
}