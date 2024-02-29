export const ContractAbi = `{"source":{"hash":"0x5ec8dfa2f12735d3ba46641268519b8df1961bfe93cb1b979dbb62b29380107e","language":"ink! 4.3.0","compiler":"rustc 1.75.0","build_info":{"build_mode":"Release","cargo_contract_version":"3.2.0","rust_toolchain":"stable-aarch64-apple-darwin","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"events","version":"0.1.0","authors":["[your_name] <[your_email]>"]},"spec":{"constructors":[{"args":[{"label":"init_value","type":{"displayName":["bool"],"type":6}}],"default":false,"docs":["Constructor that initializes the \`bool\` value to the given \`init_value\`."],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":8},"selector":"0x9bae9d5e"},{"args":[],"default":false,"docs":["Constructor that initializes the \`bool\` value to \`false\`.","","Constructors can delegate to other constructors."],"label":"default","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":8},"selector":"0xed4b9d1b"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":3},"balance":{"displayName":["Balance"],"type":15},"blockNumber":{"displayName":["BlockNumber"],"type":1},"chainExtension":{"displayName":["ChainExtension"],"type":17},"hash":{"displayName":["Hash"],"type":16},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":0}},"events":[{"args":[{"docs":[],"indexed":true,"label":"updated_by","type":{"displayName":["AccountId"],"type":3}},{"docs":[],"indexed":true,"label":"event_id","type":{"displayName":["u64"],"type":0}},{"docs":[],"indexed":false,"label":"updated_when","type":{"displayName":["u32"],"type":1}},{"docs":[],"indexed":false,"label":"last_updated","type":{"displayName":["u32"],"type":1}},{"docs":[],"indexed":false,"label":"mint_date","type":{"displayName":["Option"],"type":14}}],"docs":[],"label":"ActivityUpdated"}],"lang_error":{"displayName":["ink","LangError"],"type":10},"messages":[{"args":[{"label":"organizer_id","type":{"displayName":["AccountId"],"type":3}},{"label":"username","type":{"displayName":["HashByte"],"type":5}}],"default":false,"docs":[],"label":"register_organizer","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":8},"selector":"0x83ca23d1"},{"args":[{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"register_participant","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x1fcbe6a4"},{"args":[{"label":"collection_id","type":{"displayName":["u8"],"type":2}},{"label":"event_date","type":{"displayName":["u64"],"type":0}},{"label":"mint_date","type":{"displayName":["u64"],"type":0}}],"default":false,"docs":[],"label":"create_new_event","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0xdc82de3a"},{"args":[{"label":"mint_date","type":{"displayName":["u64"],"type":0}},{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"update_mint_date","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x600baf3c"},{"args":[{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"register_for_event","mutates":true,"payable":true,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x498dda5a"},{"args":[{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"register_attendance_of_event","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x1398a636"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"event_count"},{"layout":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0xa60ab5dd","ty":0}},"name":"event_date"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":0}},"name":"event_id"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":1}},"name":"block_created"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":2}},"name":"collection_id"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":3}},"name":"created_by"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":0}},"name":"mint_date"}],"name":"Activity"}},"root_key":"0xa60ab5dd"}},"name":"event_id_to_activity"},{"layout":{"leaf":{"key":"0x00000000","ty":5}},"name":"collection_ids"},{"layout":{"leaf":{"key":"0x00000000","ty":6}},"name":"value"},{"layout":{"root":{"layout":{"leaf":{"key":"0x4e98f1d6","ty":5}},"root_key":"0x4e98f1d6"}},"name":"organizers"},{"layout":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0xaae64bc0","ty":7}},"name":"participants_registered"},{"layout":{"leaf":{"key":"0xaae64bc0","ty":7}},"name":"participants_attended"},{"layout":{"leaf":{"key":"0xaae64bc0","ty":7}},"name":"participants_minted"}],"name":"EventParticipants"}},"root_key":"0xaae64bc0"}},"name":"event_to_participants"}],"name":"Events"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"primitive":"u64"}}},{"id":1,"type":{"def":{"primitive":"u32"}}},{"id":2,"type":{"def":{"primitive":"u8"}}},{"id":3,"type":{"def":{"composite":{"fields":[{"type":4,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":4,"type":{"def":{"array":{"len":32,"type":2}}}},{"id":5,"type":{"def":{"sequence":{"type":2}}}},{"id":6,"type":{"def":{"primitive":"bool"}}},{"id":7,"type":{"def":{"sequence":{"type":3}}}},{"id":8,"type":{"def":{"variant":{"variants":[{"fields":[{"type":9}],"index":0,"name":"Ok"},{"fields":[{"type":10}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":9},{"name":"E","type":10}],"path":["Result"]}},{"id":9,"type":{"def":{"tuple":[]}}},{"id":10,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":11,"type":{"def":{"variant":{"variants":[{"fields":[{"type":12}],"index":0,"name":"Ok"},{"fields":[{"type":10}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":12},{"name":"E","type":10}],"path":["Result"]}},{"id":12,"type":{"def":{"variant":{"variants":[{"fields":[{"type":9}],"index":0,"name":"Ok"},{"fields":[{"type":13}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":9},{"name":"E","type":13}],"path":["Result"]}},{"id":13,"type":{"def":{"variant":{"variants":[{"index":0,"name":"UserExists"},{"index":1,"name":"CollectionAlreadyCreated"}]}},"path":["events","events","Error"]}},{"id":14,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":0}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":0}],"path":["Option"]}},{"id":15,"type":{"def":{"primitive":"u128"}}},{"id":16,"type":{"def":{"composite":{"fields":[{"type":4,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":17,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"}`;
export const ContractFile = `{"source":{"hash":"0x5ec8dfa2f12735d3ba46641268519b8df1961bfe93cb1b979dbb62b29380107e","language":"ink! 4.3.0","compiler":"rustc 1.75.0","wasm":"0x0061736d0100000001420c60027f7f0060037f7f7f0060017f0060047f7f7f7f017f60037f7f7f017f60027f7e006000017f60017f017f60000060047f7f7f7f0060027e7f0060027f7f017f02c6010a057365616c310b6765745f73746f726167650003057365616c300c626c6f636b5f6e756d6265720000057365616c301176616c75655f7472616e736665727265640000057365616c3005696e7075740000057365616c300663616c6c65720000057365616c300f686173685f626c616b65325f3235360001057365616c300d6465706f7369745f6576656e740009057365616c320b7365745f73746f726167650003057365616c300b7365616c5f72657475726e000103656e76066d656d6f7279020102100322210400000400000000050a0005000101060206010700000107000002000002080b080608017f01418080040b0711020463616c6c0027066465706c6f7900290ae441212b01017f037f2002200346047f200005200020036a200120036a2d00003a0000200341016a21030c010b0b0be70201057f230041206b22022400200241106a2001100b41012104024020022d00104101710d000240024002400240024020022d0011220341037141016b0e03020301000b200341fc01714102762101410021040c040b20034104490d020c030b200241196a20033a0000200241013a001820022001360214200241003b011c200241146a2002411c6a4102100c0d0220022f011c220341ff014d0d0220034102762101410021040c020b200241196a20033a0000200241013a0018200220013602142002410036021c200241146a2002411c6a4104100c0d01200228021c220441027621012004418080044921040c010b200241086a210520012802042203410449047f4101052001200341046b36020420012001280200220341046a3602002003280000210341000b2106200520033602042005200636020020022802080d00200228020c22014180808080044921040b2000200136020420002004360200200241206a24000b3c01017f200020012802042202047f2001200241016b36020420012001280200220141016a36020020012d00000520010b3a000120002002453a00000b8e0101017f20002d00042103200041003a0004027f0240200304402001200041056a2d00003a00004101200028020022002802042203200241016b2202490d021a200141016a20002802002201200210091a0c010b41012000280200220028020422032002490d011a200120002802002201200210091a0b2000200320026b3602042000200120026a36020041000b0bd70102047f017e230041206b22022400200242808001370218200241e8800436021441d6e3e3f404200241146a2203100e20012003100f024020022802182204200228021c2201490d00200228021421032002200420016b220436021420032001200120036a2201200241146a10002103200420022802142205490d0002400240024020030e0400030301030b200220053602102002200136020c200241146a2002410c6a101020022802142201450d02200229021821060c010b410021010b2000200637020420002001360200200241206a24000f0b000b2601017f230041106b220224002002200036020c20012002410c6a41041017200241106a24000b0a0020012000412010170bc30101057f230041106b22032400200341086a2001100a024002402003280208450440024020012802042205200328020c2202490d0002402002450440410121040c010b20024100480d04200320024101101f20032802002204450d04200128020421050b200220054b0d002004200128020022042002100921062001200520026b3602042001200220046a36020020002002ad4281808080107e370204200020063602000c020b200041003602000c010b200041003602000b200341106a24000f0b000bc50302057f037e230041306b2202240020024280800137020c200241e8800436020841ddebaab07a200241086a2203100e2001200310120240200228020c220520022802102204490d00200228020821032002200520046b220636020820032004200320046a2204200241086a10002105200620022802082203490d002000027f0240024020050e0400030301030b20034178714108462003410849722003417c71411046720d0220042900002101200429000821082002200341146b36022c2002200441146a360228200428001021052002200241286a101320022d00004101710d02200228022c22044120492004417871412046720d0220022d00012104200241106a2002280228220341096a290000370300200241186a200341116a2900003703002002411f6a200341186a29000037000020022003290001370308200329002021094201210720032d00000c010b41000b3a00082000200737030020002002290308370009200020043a004420002005360240200020093703382000200837033020002001370328200041116a200241106a290300370000200041196a200241186a290300370000200041206a2002411f6a290000370000200241306a24000f0b000b2601017f230041106b22022400200220003703082001200241086a41081017200241106a24000b3801017f230041106b22022400200241086a2001100b20022d00092101200020022d00084101713a0000200020013a0001200241106a24000bd60201057f230041206b22022400200242808001370218200241e8800436021441c09799d77a200241146a2203100e200120031012024020022802182205200228021c2203490d00200228021421042002200520036b220536021420042003200320046a2203200241146a10002106200520022802142204490d0002400240024020060e0400030301030b200220043602102002200336020c200241146a2002410c6a101520022802142206450d0220022902182101200241146a2002410c6a101520022802142204450d02200228021c210520022802182103200241146a2002410c6a10152002280214450d02200241086a2002411c6a280200360200200220022902143703000c010b410021060b20002005360214200020033602102000200436020c200020013702042000200636020020002002290300370218200041206a200241086a280200360200200241206a24000f0b000bb20201047f230041406a22022400200241086a2001100a024002402002280208450440024020012802044105762203200228020c220420032004491b2203450440410121050c010b200341808080204f0d0341e880052d00001a200341057410202205450d030b2002410036021c20022003360218200220053602140240200404400340200128020422034120490d022001200341206b36020420012001280200220341206a360200200241286a200341086a290000370300200241306a200341106a290000370300200241386a200341186a29000037030020022003290000370320200241146a200241206a101d200441016b22040d000b0b20002002290214370200200041086a2002411c6a2802003602000c020b200041003602000c010b200041003602000b200241406b24000f0b000bed0101077f230041406a22032400200341186a22044200370300200341106a22054200370300200341086a22064200370300200342003703000240200241214f0440200341386a22074200370300200341306a22084200370300200341286a220942003703002003420037032020012002200341206a1005200420072903003703002005200829030037030020062009290300370300200320032903203703000c010b20032001200210091a0b20002003290300370000200041186a200341186a290300370000200041106a200341106a290300370000200041086a200341086a290300370000200341406b24000b4801027f024002402000280208220320026a22042003490d00200420002802044b0d00200420036b2002470d01200028020020036a2001200210091a200020043602080f0b000b000b3701027f230041106b22002400200041003602082000410436020c200041086a2000410c6a100120002802082101200041106a240020010b6d01017f230041106b2201240020014180800136020c41e880042001410c6a1004200041e98004290000370001200041096a41f18004290000370000200041116a41f98004290000370000200041186a41808104290000370000200041e880042d00003a0000200141106a24000b4d02017f027e230041206b2200240020004200370308200042003703002000411036021c20002000411c6a10022000290308210120002903002102200041206a2400410541042001200284501b0b100020012002101e20022000200110170b4201027f230041106b22012400200141086a2000100b20012d0009210020012d00082102200141106a240041024101410220004101461b410020001b20024101711b0b890401087f200028020822022000280204460440230041206b2203240002400240200241016a2202450d00200028020422044100480d00410420044101742206200220022006491b2202200241044d1b220841808080204921072008410574210202402004450440200341003602180c010b200341013602182003200441057436021c200320002802003602140b200341146a2105230041106b22042400200341086a2206027f02402007044020024100480d01027f20052802040440200541086a2802002207450440200441086a20024100101f20042802082105200428020c0c020b200528020021090240200210202205450440410021050c010b20052009200710091a0b20020c010b200420024100101f2004280200210520042802040b21072005044020062005360204200641086a200736020041000c030b20064101360204200641086a200236020041010c020b20064100360204200641086a200236020041010c010b2006410036020441010b360200200441106a24002003280208450d01200328020c1a0b000b200328020c21022000200836020420002002360200200341206a2400200028020821020b200028020020024105746a22032001290000370000200341086a200141086a290000370000200341106a200141106a290000370000200341186a200141186a290000370000200241016a22010440200020013602080f0b000b7401017f230041106b2202240002402000413f4d04402001200041027410250c010b200041ffff004d0440200220004102744101723b010e20012002410e6a410210170c010b200041ffffffff034d044020004102744102722001100e0c010b20014103102520002001100e0b200241106a24000b2c002001047f200245044041e880052d00001a0b200110200541010b210220002001360204200020023602000b800101027f0240027f410041e08004280200220120006a22022001490d001a41e480042802002002490440200041ffff036a22024110764000220141ffff034b0d022001411074220120024180807c716a22022001490d0241e4800420023602004100200020016a22022001490d011a0b41e08004200236020020010b0f0b41000b4401027f41e8800441003a000041012103200141ff0171410247044041e9800441013a000041022103200121020b200341e880046a20023a00002000200341016a1024000b3c01027f027f200145044041e88004210141010c010b4101210241e8800441013a000041e98004210141020b2103200120023a0000200020031024000bb00101047f230041106b22012400200142808001370204200141e8800436020041002001100e02402001280204220420012802082202490d0020012802002103200141003602082001200420026b3602042001200220036a3602002000290300200110122000280208200041106a2802002001101b200120002d00143a000f20012001410f6a410110172001280208220020012802044b0d00200320022001280200200010071a200141106a24000f0b000b0d00200041e8800420011008000b2d01017f2000280208220220002802044904402000200241016a360208200028020020026a20013a00000f0b000bd50502077f017e230041306b22012400200142808001370208200141e880043602044103200141046a101e0240200128020c2202418180014f0d002001410036020c20014180800120026b22033602082001200241e880046a2205360204418480044100200141046a2206101b20064184800441171017200128020c220620012802084b0d00200141046a22042001280204200610162001410036022c20012003360228200120053602242004200141246a100f20022002200128022c6a22024b2002418180014f720d002001410036020c20014180800120026b22033602082001200241e880046a2205360204419b80044123200141046a2204101b200041106a22062004100f200128020c220420012802084b0d00200141046a22072001280204200410162001410036022c20012003360228200120053602242007200141246a100f20022002200128022c6a22024b2002418180014f720d002001410036020c20014180800120026b22033602082001200241e880046a220536020441be80044121200141046a2204101b2000290330220820041012200128020c220420012802084b0d00200141046a22072001280204200410162001410036022c20012003360228200120053602242007200141246a100f20022002200128022c6a22024b2002418180014f720d0020014180800120026b3602082001200241e880046a2203360204200241808001460d00200341003a00002001410136020c2006200141046a2203100f20082003101220002802382003100e200028023c2003100e027f2000290300500440200128020c2200200128020822034f0d022001280204220520006a41003a0000200041016a0c010b200128020c220320012802084f0d01200128020420036a41013a00002001200341016a36020c2000290308200141046a10122001280208210320012802042105200128020c0b220020034b0d0041e880042002200520001006200141306a24000f0b000b981902097f067e230041f0016b220024002000418080013602800141e8800420004180016a1003024002400240024002402000280280012207418180014f0d0020074104490d03200041ec80043602202000200741046b220636022441eb80042d0000210141ea80042d0000210241e980042d0000210302400240027e41e880042d0000220441134704400240024002402004411f470440200441c900460d03200441e000460d02200441dc01460d01200441830147200341ca0147722002412347200141ff017141d1014772720d0b200641204f0d060c0b0b200341cb0147200241e6014772200141ff017141a40147200641074d72720d0a4101210341ec80042902000c040b200341820147200241de014772200141ff0171413a47720d092000200041206a101320002d00004101710d09200028022422024108490d0920002d0001210520002000280220220341086a3602202000200241086b220236022420024108490d09200329000021092000280220290000210b410221030c050b2003410b47200241af014772200141ff0171413c47200741146b41704f72720d0841f48004290200220b42807e83210c41ec80042902002109200ba72105410321030c040b2003418d0147200241da014772200141ff017141da0047200641074d72720d074104210341ec80042902000c010b200341980147200241a6014772200141ff0171413647200641074d72720d064105210341ec80042902000b21090c010b41002103200041ce016a220241ef80042d00003a00002000418c81043602202000200741246b360224200041ed80042f00003b01cc0141888104280200210641808104290200210b41f88004290200210a41f08004290200210941ec80042d0000210820004180016a200041206a10102000280280012201450d04200041e2006a20022d00003a0000200020002f01cc013b0160200a42807e83210c200029028401210e200aa721050b200041066a200041e2006a2d00003a0000200020002f01603b010420004280800137028401200041e8800436028001410020004180016a100e20002802840122072000280288012202490d0020002802800121042000200720026b22073602800120042002200220046a220220004180016a10002007200028028001220449720d00200020023602202000200436022420044108490d002000200441086b3602242000200241086a3602202002290000210a20004180016a200041206a10102000280280012202450d00200029028401210d200041206a101c220441ff01714102460d0020002002360210200020043a001c2000200a3703082000200d3702140240024002400240024002400240200341016b0e050102030005060b200041e0006a101910181a20004180016a200910112009200a560d06200029038001500d06200041206a200910142000280220450d06200041cc016a200041206a412410091a20002802d401410574210220002802cc01210103402002450d04200241206b21022001200041e0006a10282105200141206a21012005450d000b0c060b101a41ff01714105470d05200041cc016a101920004180016a20091011200029038001500d0520004180016a20091014200028028001450d05200041206a20004180016a412410091a2000280228410574210220002802202101034020020440200241206b21022001200041cc016a10282105200141206a21012005450d010c070b0b200041206a200041cc016a101d0c090b101a41ff01714105470d04200041cc016a220110191018210620004180016a2001100d200028028001450d04200d422088a72101200541ff01712103027f024003402001450d01200141016b210120022d00002104200241016a210220032004470d000b4101210141010c010b200041386a200041e4016a290000370300200041306a200041dc016a290000370300200041286a200041d4016a290000370300200020002900cc01370320200020053a005c20002006360258200020093703402000200b37035020004200200a42017c220a200a5022041b220c37034820004280800137028401200041e880043602800141c09799d77a20004180016a2201100e200c2001101220002802840122032000280288012201490d05200028028001210220004100360288012000200320016b360284012000200120026a36028001410020004180016a2203101e41002003101e41002003101e20002802880122032000280284014b0d0520022001200028028001200310071a20004280800137028401200041e880043602800141ddebaab07a20004180016a2201100e200c2001101220002802840122012000280288012202490d05200028028001210320004100360288012000200120026b360284012000200220036a36028001200920004180016a22011012200c2001101220062001100e200020053a00602001200041e0006a41011017200041206a2001100f200b2001101220002802880122012000280284014b0d0520032002200028028001200110071a20040d052000200a370308200041a8016a200041e4016a290000370300200041a0016a200041dc016a29000037030020004198016a200041d4016a290000370300200020002900cc0137039001200020063602bc01200020063602b8012000200a3703b001200042003703800120004180016a2201102620004190016a200041186a29030037030020004188016a200041106a2903003703002000200029030837038001200110234102210141000b20011021000b101a41ff01714105470d03200041cc016a1019101821062000419c016a200041e4016a29000037020020004194016a200041dc016a2900003702002000418c016a200041d4016a290000370200200020002900cc013702840120004180800436028001200042808001370224200041e8800436022041d6e3e3f404200041206a2201100e20004184016a2001100f2000280224220320002802282201490d03200028022021022000200320016b220336022020022001200120026a2201200041206a10002102200320002802202204490d0302400240024020020e0401060600060b410021020c010b2000200436026420002001360260200041206a200041e0006a101020002802202202450d040b20004180016a200c2005ad42ff018384220b1011200a200b540d03200029038001500d032002452002047f20002802c0012101200041c8006a200041e4016a290000370300200041406b200041dc016a290000370300200041386a200041d4016a290000370300200020002900cc013703302000200136025c200020063602582000200b3703502000200937032820004201370320200041206a102620004190016a200041186a29030037030020004188016a200041106a290300370300200020002903083703800120004180016a102341020541000b1021000b200041cc016a200041e0006a101d0c060b101a41ff01714105470d01200041e0006a101910181a20004180016a200910112009200a560d01200029038001500d01200041206a200910142000280220450d01200041cc016a200041206a412410091a200041e0016a2802004105742102200041d8016a210520002802d801210103402002450d03200241206b21022001200041e0006a10282106200141206a21012006450d000b0c050b101a41ff01714105460d020b000b2005200041e0006a101d0c020b200020083a008001200020002f01043b0081012000200e3702a401200020013602a0012000200636029c012000200b3702940120002009370284012000200041066a2d00003a0083012000200c2005ad42ff01838437028c01230041e0006b220124002001200041086a360200200141046a20004180016a22062202412c100921052001412c6a2802002103200141246a2802002104200141306a2005100d0240024020012802300d002001413c6a200241086a290200370200200141c4006a200241106a290200370200200141cc006a200241186a29020037020020014180800436023020012002290200370234200142808001370258200141e8800436025441d6e3e3f404200141d4006a2202100e200141346a2002100f20012802582207200128025c2202490d00200128025421052001410036025c2001200720026b3602582001200220056a36025420042003200141d4006a101b200128025c220320012802584b0d00200520022001280254200310071a200141e0006a24000c010b000b20004190016a200041186a29030037030020004188016a200041106a290300370300200020002903083703800120061023410041001022000b410141011022000b20004190016a200041186a29030037030020004188016a200041106a290300370300200020002903083703800120004180016a1023410041021021000b4601037f027f41202102034041002002450d011a200241016b210220012d0000210320002d00002104200041016a2100200141016a210120032004460d000b200420036b0b450ba50201057f230041206b22002400024002400240101a41ff01714105470d0020004180800136020841e88004200041086a100320002802082201418180014f0d00024020014104490d00200041ec80043602082000200141046b36020c41eb80042d0000210141ea80042d0000210241e980042d0000210341e880042d0000220441ed014704402004419b0147200341ae0147722002419d0147200141de004772720d01200041086a101c220141ff01714102460d01200020013a001c20004100360218200042013703100c040b200341cb00472002419d0147720d002001411b460d020b410141011022000b000b2000411c6a41003a000020004200370214200041013602100b20004200370308200041086a102341e8800441003b0100410041021024000b0b670100418080040b5fd6f1984e4576656e74733a3a4163746976697479557064617465644576656e74733a3a4163746976697479557064617465643a3a757064617465645f62794576656e74733a3a4163746976697479557064617465643a3a6576656e745f6964","build_info":{"build_mode":"Release","cargo_contract_version":"3.2.0","rust_toolchain":"stable-aarch64-apple-darwin","wasm_opt_settings":{"keep_debug_symbols":false,"optimization_passes":"Z"}}},"contract":{"name":"events","version":"0.1.0","authors":["[your_name] <[your_email]>"]},"spec":{"constructors":[{"args":[{"label":"init_value","type":{"displayName":["bool"],"type":6}}],"default":false,"docs":["Constructor that initializes the \`bool\` value to the given \`init_value\`."],"label":"new","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":8},"selector":"0x9bae9d5e"},{"args":[],"default":false,"docs":["Constructor that initializes the \`bool\` value to \`false\`.","","Constructors can delegate to other constructors."],"label":"default","payable":false,"returnType":{"displayName":["ink_primitives","ConstructorResult"],"type":8},"selector":"0xed4b9d1b"}],"docs":[],"environment":{"accountId":{"displayName":["AccountId"],"type":3},"balance":{"displayName":["Balance"],"type":15},"blockNumber":{"displayName":["BlockNumber"],"type":1},"chainExtension":{"displayName":["ChainExtension"],"type":17},"hash":{"displayName":["Hash"],"type":16},"maxEventTopics":4,"timestamp":{"displayName":["Timestamp"],"type":0}},"events":[{"args":[{"docs":[],"indexed":true,"label":"updated_by","type":{"displayName":["AccountId"],"type":3}},{"docs":[],"indexed":true,"label":"event_id","type":{"displayName":["u64"],"type":0}},{"docs":[],"indexed":false,"label":"updated_when","type":{"displayName":["u32"],"type":1}},{"docs":[],"indexed":false,"label":"last_updated","type":{"displayName":["u32"],"type":1}},{"docs":[],"indexed":false,"label":"mint_date","type":{"displayName":["Option"],"type":14}}],"docs":[],"label":"ActivityUpdated"}],"lang_error":{"displayName":["ink","LangError"],"type":10},"messages":[{"args":[{"label":"organizer_id","type":{"displayName":["AccountId"],"type":3}},{"label":"username","type":{"displayName":["HashByte"],"type":5}}],"default":false,"docs":[],"label":"register_organizer","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":8},"selector":"0x83ca23d1"},{"args":[{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"register_participant","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x1fcbe6a4"},{"args":[{"label":"collection_id","type":{"displayName":["u8"],"type":2}},{"label":"event_date","type":{"displayName":["u64"],"type":0}},{"label":"mint_date","type":{"displayName":["u64"],"type":0}}],"default":false,"docs":[],"label":"create_new_event","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0xdc82de3a"},{"args":[{"label":"mint_date","type":{"displayName":["u64"],"type":0}},{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"update_mint_date","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x600baf3c"},{"args":[{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"register_for_event","mutates":true,"payable":true,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x498dda5a"},{"args":[{"label":"event_id","type":{"displayName":["EventId"],"type":0}}],"default":false,"docs":[],"label":"register_attendance_of_event","mutates":true,"payable":false,"returnType":{"displayName":["ink","MessageResult"],"type":11},"selector":"0x1398a636"}]},"storage":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0x00000000","ty":0}},"name":"event_count"},{"layout":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0xa60ab5dd","ty":0}},"name":"event_date"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":0}},"name":"event_id"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":1}},"name":"block_created"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":2}},"name":"collection_id"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":3}},"name":"created_by"},{"layout":{"leaf":{"key":"0xa60ab5dd","ty":0}},"name":"mint_date"}],"name":"Activity"}},"root_key":"0xa60ab5dd"}},"name":"event_id_to_activity"},{"layout":{"leaf":{"key":"0x00000000","ty":5}},"name":"collection_ids"},{"layout":{"leaf":{"key":"0x00000000","ty":6}},"name":"value"},{"layout":{"root":{"layout":{"leaf":{"key":"0x4e98f1d6","ty":5}},"root_key":"0x4e98f1d6"}},"name":"organizers"},{"layout":{"root":{"layout":{"struct":{"fields":[{"layout":{"leaf":{"key":"0xaae64bc0","ty":7}},"name":"participants_registered"},{"layout":{"leaf":{"key":"0xaae64bc0","ty":7}},"name":"participants_attended"},{"layout":{"leaf":{"key":"0xaae64bc0","ty":7}},"name":"participants_minted"}],"name":"EventParticipants"}},"root_key":"0xaae64bc0"}},"name":"event_to_participants"}],"name":"Events"}},"root_key":"0x00000000"}},"types":[{"id":0,"type":{"def":{"primitive":"u64"}}},{"id":1,"type":{"def":{"primitive":"u32"}}},{"id":2,"type":{"def":{"primitive":"u8"}}},{"id":3,"type":{"def":{"composite":{"fields":[{"type":4,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","AccountId"]}},{"id":4,"type":{"def":{"array":{"len":32,"type":2}}}},{"id":5,"type":{"def":{"sequence":{"type":2}}}},{"id":6,"type":{"def":{"primitive":"bool"}}},{"id":7,"type":{"def":{"sequence":{"type":3}}}},{"id":8,"type":{"def":{"variant":{"variants":[{"fields":[{"type":9}],"index":0,"name":"Ok"},{"fields":[{"type":10}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":9},{"name":"E","type":10}],"path":["Result"]}},{"id":9,"type":{"def":{"tuple":[]}}},{"id":10,"type":{"def":{"variant":{"variants":[{"index":1,"name":"CouldNotReadInput"}]}},"path":["ink_primitives","LangError"]}},{"id":11,"type":{"def":{"variant":{"variants":[{"fields":[{"type":12}],"index":0,"name":"Ok"},{"fields":[{"type":10}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":12},{"name":"E","type":10}],"path":["Result"]}},{"id":12,"type":{"def":{"variant":{"variants":[{"fields":[{"type":9}],"index":0,"name":"Ok"},{"fields":[{"type":13}],"index":1,"name":"Err"}]}},"params":[{"name":"T","type":9},{"name":"E","type":13}],"path":["Result"]}},{"id":13,"type":{"def":{"variant":{"variants":[{"index":0,"name":"UserExists"},{"index":1,"name":"CollectionAlreadyCreated"}]}},"path":["events","events","Error"]}},{"id":14,"type":{"def":{"variant":{"variants":[{"index":0,"name":"None"},{"fields":[{"type":0}],"index":1,"name":"Some"}]}},"params":[{"name":"T","type":0}],"path":["Option"]}},{"id":15,"type":{"def":{"primitive":"u128"}}},{"id":16,"type":{"def":{"composite":{"fields":[{"type":4,"typeName":"[u8; 32]"}]}},"path":["ink_primitives","types","Hash"]}},{"id":17,"type":{"def":{"variant":{}},"path":["ink_env","types","NoChainExtension"]}}],"version":"4"}`;