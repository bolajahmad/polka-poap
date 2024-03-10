import {Abi, Bytes, encodeCall, decodeResult} from "@subsquid/ink-abi"

export const metadata = {
  "source": {
    "hash": "0x5ec8dfa2f12735d3ba46641268519b8df1961bfe93cb1b979dbb62b29380107e",
    "language": "ink! 4.3.0",
    "compiler": "rustc 1.75.0",
    "build_info": {
      "build_mode": "Release",
      "cargo_contract_version": "3.2.0",
      "rust_toolchain": "stable-aarch64-apple-darwin",
      "wasm_opt_settings": {
        "keep_debug_symbols": false,
        "optimization_passes": "Z"
      }
    }
  },
  "contract": {
    "name": "events",
    "version": "0.1.0",
    "authors": [
      "[your_name] <[your_email]>"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "label": "init_value",
            "type": {
              "displayName": [
                "bool"
              ],
              "type": 6
            }
          }
        ],
        "default": false,
        "docs": [
          "Constructor that initializes the `bool` value to the given `init_value`."
        ],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 8
        },
        "selector": "0x9bae9d5e"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          "Constructor that initializes the `bool` value to `false`.",
          "",
          "Constructors can delegate to other constructors."
        ],
        "label": "default",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 8
        },
        "selector": "0xed4b9d1b"
      }
    ],
    "docs": [],
    "environment": {
      "accountId": {
        "displayName": [
          "AccountId"
        ],
        "type": 3
      },
      "balance": {
        "displayName": [
          "Balance"
        ],
        "type": 15
      },
      "blockNumber": {
        "displayName": [
          "BlockNumber"
        ],
        "type": 1
      },
      "chainExtension": {
        "displayName": [
          "ChainExtension"
        ],
        "type": 17
      },
      "hash": {
        "displayName": [
          "Hash"
        ],
        "type": 16
      },
      "maxEventTopics": 4,
      "timestamp": {
        "displayName": [
          "Timestamp"
        ],
        "type": 0
      }
    },
    "events": [
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "updated_by",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          },
          {
            "docs": [],
            "indexed": true,
            "label": "event_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "updated_when",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "last_updated",
            "type": {
              "displayName": [
                "u32"
              ],
              "type": 1
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "mint_date",
            "type": {
              "displayName": [
                "Option"
              ],
              "type": 14
            }
          }
        ],
        "docs": [],
        "label": "ActivityUpdated"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 10
    },
    "messages": [
      {
        "args": [
          {
            "label": "organizer_id",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 3
            }
          },
          {
            "label": "username",
            "type": {
              "displayName": [
                "HashByte"
              ],
              "type": 5
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "register_organizer",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 8
        },
        "selector": "0x83ca23d1"
      },
      {
        "args": [
          {
            "label": "event_id",
            "type": {
              "displayName": [
                "EventId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "register_participant",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0x1fcbe6a4"
      },
      {
        "args": [
          {
            "label": "collection_id",
            "type": {
              "displayName": [
                "u8"
              ],
              "type": 2
            }
          },
          {
            "label": "event_date",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 0
            }
          },
          {
            "label": "mint_date",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "create_new_event",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0xdc82de3a"
      },
      {
        "args": [
          {
            "label": "mint_date",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 0
            }
          },
          {
            "label": "event_id",
            "type": {
              "displayName": [
                "EventId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "update_mint_date",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0x600baf3c"
      },
      {
        "args": [
          {
            "label": "event_id",
            "type": {
              "displayName": [
                "EventId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "register_for_event",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0x498dda5a"
      },
      {
        "args": [
          {
            "label": "event_id",
            "type": {
              "displayName": [
                "EventId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "register_attendance_of_event",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 11
        },
        "selector": "0x1398a636"
      }
    ]
  },
  "storage": {
    "root": {
      "layout": {
        "struct": {
          "fields": [
            {
              "layout": {
                "leaf": {
                  "key": "0x00000000",
                  "ty": 0
                }
              },
              "name": "event_count"
            },
            {
              "layout": {
                "root": {
                  "layout": {
                    "struct": {
                      "fields": [
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xa60ab5dd",
                              "ty": 0
                            }
                          },
                          "name": "event_date"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xa60ab5dd",
                              "ty": 0
                            }
                          },
                          "name": "event_id"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xa60ab5dd",
                              "ty": 1
                            }
                          },
                          "name": "block_created"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xa60ab5dd",
                              "ty": 2
                            }
                          },
                          "name": "collection_id"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xa60ab5dd",
                              "ty": 3
                            }
                          },
                          "name": "created_by"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xa60ab5dd",
                              "ty": 0
                            }
                          },
                          "name": "mint_date"
                        }
                      ],
                      "name": "Activity"
                    }
                  },
                  "root_key": "0xa60ab5dd"
                }
              },
              "name": "event_id_to_activity"
            },
            {
              "layout": {
                "leaf": {
                  "key": "0x00000000",
                  "ty": 5
                }
              },
              "name": "collection_ids"
            },
            {
              "layout": {
                "leaf": {
                  "key": "0x00000000",
                  "ty": 6
                }
              },
              "name": "value"
            },
            {
              "layout": {
                "root": {
                  "layout": {
                    "leaf": {
                      "key": "0x4e98f1d6",
                      "ty": 5
                    }
                  },
                  "root_key": "0x4e98f1d6"
                }
              },
              "name": "organizers"
            },
            {
              "layout": {
                "root": {
                  "layout": {
                    "struct": {
                      "fields": [
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xaae64bc0",
                              "ty": 7
                            }
                          },
                          "name": "participants_registered"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xaae64bc0",
                              "ty": 7
                            }
                          },
                          "name": "participants_attended"
                        },
                        {
                          "layout": {
                            "leaf": {
                              "key": "0xaae64bc0",
                              "ty": 7
                            }
                          },
                          "name": "participants_minted"
                        }
                      ],
                      "name": "EventParticipants"
                    }
                  },
                  "root_key": "0xaae64bc0"
                }
              },
              "name": "event_to_participants"
            }
          ],
          "name": "Events"
        }
      },
      "root_key": "0x00000000"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "primitive": "u64"
        }
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 4,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 2
          }
        }
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "sequence": {
            "type": 2
          }
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "primitive": "bool"
        }
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "sequence": {
            "type": 3
          }
        }
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 1,
                "name": "CouldNotReadInput"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "LangError"
        ]
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 12
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 12
          },
          {
            "name": "E",
            "type": 10
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 9
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 13
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 9
          },
          {
            "name": "E",
            "type": 13
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "UserExists"
              },
              {
                "index": 1,
                "name": "CollectionAlreadyCreated"
              }
            ]
          }
        },
        "path": [
          "events",
          "events",
          "Error"
        ]
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 15,
      "type": {
        "def": {
          "primitive": "u128"
        }
      }
    },
    {
      "id": 16,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 4,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "Hash"
        ]
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "variant": {}
        },
        "path": [
          "ink_env",
          "types",
          "NoChainExtension"
        ]
      }
    }
  ],
  "version": "4"
}

const _abi = new Abi(metadata)

export function decodeEvent(bytes: Bytes): Event {
    return _abi.decodeEvent(bytes)
}

export function decodeMessage(bytes: Bytes): Message {
    return _abi.decodeMessage(bytes)
}

export function decodeConstructor(bytes: Bytes): Constructor {
    return _abi.decodeConstructor(bytes)
}

export interface Chain {
    rpc: {
        call<T=any>(method: string, params?: unknown[]): Promise<T>
    }
}

export interface ChainContext {
    _chain: Chain
}

export class Contract {
    constructor(private ctx: ChainContext, private address: Bytes, private blockHash?: Bytes) { }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.rpc.call('state_call', ['ContractsApi_call', data, this.blockHash])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export type Constructor = Constructor_default | Constructor_new

/**
 * Constructor that initializes the `bool` value to `false`.
 * 
 * Constructors can delegate to other constructors.
 */
export interface Constructor_default {
    __kind: 'default'
}

/**
 * Constructor that initializes the `bool` value to the given `init_value`.
 */
export interface Constructor_new {
    __kind: 'new'
    initValue: bool
}

export type bool = boolean

export type Message = Message_create_new_event | Message_register_attendance_of_event | Message_register_for_event | Message_register_organizer | Message_register_participant | Message_update_mint_date

export interface Message_create_new_event {
    __kind: 'create_new_event'
    collectionId: u8
    eventDate: bigint
    mintDate: bigint
}

export interface Message_register_attendance_of_event {
    __kind: 'register_attendance_of_event'
    eventId: bigint
}

export interface Message_register_for_event {
    __kind: 'register_for_event'
    eventId: bigint
}

export interface Message_register_organizer {
    __kind: 'register_organizer'
    organizerId: AccountId
    username: HashByte
}

export interface Message_register_participant {
    __kind: 'register_participant'
    eventId: bigint
}

export interface Message_update_mint_date {
    __kind: 'update_mint_date'
    mintDate: bigint
    eventId: bigint
}

export type HashByte = Bytes

export type AccountId = Bytes

export type u8 = number

export type Event = Event_ActivityUpdated

export interface Event_ActivityUpdated {
    __kind: 'ActivityUpdated'
    updatedBy: AccountId
    eventId: bigint
    updatedWhen: u32
    lastUpdated: u32
    mintDate?: (bigint | undefined)
}

export type u32 = number

export type Result<T, E> = {__kind: 'Ok', value: T} | {__kind: 'Err', value: E}
