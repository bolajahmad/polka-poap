#[macro_export]
macro_rules! tests {
    ($contract:ident, $constructor:expr) => {
        mod _users_unit_tests {
            // Imports all the definitions from the outer scope
            use super::super::*;
            use ink::env::test;

            type Event = <$contract as ::ink::reflect::ContractEventBase>::Type;

            // Gathers all emitted events, skip `shift` first, decode the rest and return as vector
            fn decode_events(shift: usize) -> Vec<Event> {
                test::recorded_events()
                    .skip(shift)
                    .map(|e| <Event as scale::Decode>::decode(&mut &e.data[..]).unwrap())
                    .collect()
            }
        }
    };
}
