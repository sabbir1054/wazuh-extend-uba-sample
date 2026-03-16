you need to hit this https://localhost:9200/wazuh-alerts-*/_search
body:
{
 "size": 100,
 "sort": [
   { "timestamp": "desc" }
 ]
}


response:
{
    "took": 23,
    "timed_out": false,
    "_shards": {
        "total": 9,
        "successful": 9,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3814,
            "relation": "eq"
        },
        "max_score": null,
        "hits": [
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "Np459ZwBtQIFeAKvCF0c",
                "_score": null,
                "_source": {
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "previous_output": "Previous output:\nossec: output: 'netstat listening ports':\ntcp 127.0.0.1:43461 0.0.0.0:* 797/containerd",
                    "manager": {
                        "name": "kali"
                    },
                    "rule": {
                        "firedtimes": 2,
                        "mail": false,
                        "level": 7,
                        "pci_dss": [
                            "10.2.7",
                            "10.6.1"
                        ],
                        "hipaa": [
                            "164.312.b"
                        ],
                        "tsc": [
                            "CC6.8",
                            "CC7.2",
                            "CC7.3"
                        ],
                        "description": "Listened ports status (netstat) changed (new port opened or closed).",
                        "groups": [
                            "ossec"
                        ],
                        "id": "533",
                        "nist_800_53": [
                            "AU.14",
                            "AU.6"
                        ],
                        "gpg13": [
                            "10.1"
                        ],
                        "gdpr": [
                            "IV_35.7.d"
                        ]
                    },
                    "decoder": {
                        "name": "ossec"
                    },
                    "full_log": "ossec: output: 'netstat listening ports':\nudp 10.0.2.15:1900 0.0.0.0:* 3129/qbittorrent\nudp 0.0.0.0:6771 0.0.0.0:* 3129/qbittorrent\nudp 0.0.0.0:6771 0.0.0.0:* 3129/qbittorrent\nudp6 :::6771 :::* 3129/qbittorrent\nudp6 :::6771 :::* 3129/qbittorrent\nudp6 :::6771 :::* 3129/qbittorrent\nudp6 :::6771 :::* 3129/qbittorrent\nudp 10.0.2.15:35034 0.0.0.0:* 3129/qbittorrent\nudp 10.0.2.15:36426 0.0.0.0:* 3129/qbittorrent\ntcp 127.0.0.1:43461 0.0.0.0:* 797/containerd\ntcp 10.0.2.15:57678 0.0.0.0:* 3129/qbittorrent\ntcp 127.0.0.1:57678 0.0.0.0:* 3129/qbittorrent\ntcp6 ::1:57678 :::* 3129/qbittorrent\ntcp6 fd17:625c:f037:2::57678 :::* 3129/qbittorrent\ntcp6 fd17:625c:f037:2::57678 :::* 3129/qbittorrent\ntcp6 fe80::a00:27ff:fe:57678 :::* 3129/qbittorrent\nudp 10.0.2.15:57678 0.0.0.0:* 3129/qbittorrent\nudp 127.0.0.1:57678 0.0.0.0:* 3129/qbittorrent\nudp6 ::1:57678 :::* 3129/qbittorrent\nudp6 fd17:625c:f037:2::57678 :::* 3129/qbittorrent\nudp6 fd17:625c:f037:2::57678 :::* 3129/qbittorrent\nudp6 fe80::a00:27ff:fe:57678 :::* 3129/qbittorrent",
                    "previous_log": "ossec: output: 'netstat listening ports':\ntcp 127.0.0.1:43461 0.0.0.0:* 797/containerd",
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:57:51.875Z",
                    "location": "netstat listening ports",
                    "id": "1773640671.3016702",
                    "timestamp": "2026-03-15T22:57:51.875-0700"
                },
                "sort": [
                    1773640671875
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "M5409ZwBtQIFeAKvrl0Q",
                "_score": null,
                "_source": {
                    "agent": {
                        "ip": "192.168.0.186",
                        "name": "laptop1",
                        "id": "002"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "win": {
                            "eventdata": {
                                "data": "2026-03-16T07:18:11Z, RulesEngine"
                            },
                            "system": {
                                "eventID": "16384",
                                "eventSourceName": "Software Protection Platform Service",
                                "keywords": "0x80000000000000",
                                "providerGuid": "{E23B33B0-C8C9-472C-A5F9-F2BDFEA0F156}",
                                "level": "4",
                                "channel": "Application",
                                "opcode": "0",
                                "message": "\"Successfully scheduled Software Protection service for re-start at 2026-03-16T07:18:11Z. Reason: RulesEngine.\"",
                                "version": "0",
                                "systemTime": "2026-03-16T05:53:12.0737722Z",
                                "eventRecordID": "246000",
                                "threadID": "0",
                                "computer": "SABBIR-GIGABYTE-NOTEBOOK",
                                "task": "0",
                                "processID": "17016",
                                "severityValue": "INFORMATION",
                                "providerName": "Microsoft-Windows-Security-SPP"
                            }
                        }
                    },
                    "rule": {
                        "firedtimes": 20,
                        "mail": false,
                        "level": 3,
                        "description": "Software protection service scheduled successfully.",
                        "groups": [
                            "windows",
                            "windows_application"
                        ],
                        "id": "60642"
                    },
                    "decoder": {
                        "name": "windows_eventchannel"
                    },
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:53:12.426Z",
                    "location": "EventChannel",
                    "id": "1773640392.3015085",
                    "timestamp": "2026-03-15T22:53:12.426-0700"
                },
                "sort": [
                    1773640392426
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "Mp409ZwBtQIFeAKvTF1e",
                "_score": null,
                "_source": {
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "sca": {
                            "score": "46",
                            "total_checks": "190",
                            "file": "sca_distro_independent_linux.yml",
                            "policy_id": "sca_distro_independent_linux",
                            "invalid": "8",
                            "description": "This document provides prescriptive guidance for establishing a secure configuration posture for Distribution Independent Linux based on CIS benchmark for Distribution Independent Linux v2.0.0.",
                            "scan_id": "1584726628",
                            "passed": "85",
                            "failed": "97",
                            "type": "summary",
                            "policy": "CIS Distribution Independent Linux Benchmark v2.0.0."
                        }
                    },
                    "rule": {
                        "firedtimes": 1,
                        "mail": false,
                        "level": 7,
                        "pci_dss": [
                            "2.2"
                        ],
                        "tsc": [
                            "CC7.1",
                            "CC7.2"
                        ],
                        "description": "SCA summary: CIS Distribution Independent Linux Benchmark v2.0.0.: Score less than 50% (46)",
                        "groups": [
                            "sca"
                        ],
                        "id": "19004",
                        "nist_800_53": [
                            "CM.1"
                        ],
                        "gdpr": [
                            "IV_35.7.d"
                        ]
                    },
                    "decoder": {
                        "name": "sca"
                    },
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:52:46.523Z",
                    "location": "sca",
                    "id": "1773640366.3013581",
                    "timestamp": "2026-03-15T22:52:46.523-0700"
                },
                "sort": [
                    1773640366523
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "MZ409ZwBtQIFeAKvMV0E",
                "_score": null,
                "_source": {
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "sca": {
                            "scan_id": "1584726628",
                            "check": {
                                "result": "not applicable",
                                "remediation": "On 32 bit systems install a kernel with PAE support, no installation is required on 64 bit systems: If necessary configure your bootloader to load the new kernel and reboot the system. You may need to enable NX or XD support in your bios. Notes: Ensure your system supports the XD or NX bit and has PAE support before implementing this recommendation as this may prevent it from booting if these are not supported by your hardware.",
                                "reason": "Timeout overtaken running command 'journalctl'",
                                "previous_result": "passed",
                                "compliance": {
                                    "nist_sp_800-53": "SC-39,SI-16",
                                    "mitre_techniques": "T1003,T1068,T1080,T1085,T1101,T1117,T1131,T1189,T1190,T1203,T1210,T1211,T1212",
                                    "cis": "1.5.2",
                                    "cis_csc_v7": "8.3"
                                },
                                "description": "Recent processors in the x86 family support the ability to prevent code execution on a per memory page basis. Generically and on AMD processors, this ability is called No Execute (NX), while on Intel processors it is called Execute Disable (XD). This ability can help prevent exploitation of buffer overflow vulnerabilities and should be activated whenever possible. Extra steps must be taken to ensure that this protection is enabled, particularly on 32-bit x86 systems. Other processors, such as Itanium and POWER, have included such support since inception and the standard kernel for those platforms supports the feature.",
                                "id": "36030",
                                "title": "Ensure XD/NX support is enabled.",
                                "rationale": "Enabling any feature that can protect against buffer overflow attacks enhances the security of the system.",
                                "command": [
                                    "journalctl"
                                ]
                            },
                            "type": "check",
                            "policy": "CIS Distribution Independent Linux Benchmark v2.0.0."
                        }
                    },
                    "rule": {
                        "mail": false,
                        "level": 5,
                        "pci_dss": [
                            "2.2"
                        ],
                        "tsc": [
                            "CC7.1",
                            "CC7.2"
                        ],
                        "nist_sp_800-53": [
                            "SC-39",
                            "SI-16"
                        ],
                        "description": "CIS Distribution Independent Linux Benchmark v2.0.0.: Ensure XD/NX support is enabled.: Status changed from passed to 'not applicable'",
                        "groups": [
                            "sca"
                        ],
                        "mitre_techniques": [
                            "T1003",
                            "T1068",
                            "T1080",
                            "T1085",
                            "T1101",
                            "T1117",
                            "T1131",
                            "T1189",
                            "T1190",
                            "T1203",
                            "T1210",
                            "T1211",
                            "T1212"
                        ],
                        "cis": [
                            "1.5.2"
                        ],
                        "nist_800_53": [
                            "CM.1"
                        ],
                        "gdpr": [
                            "IV_35.7.d"
                        ],
                        "firedtimes": 1,
                        "id": "19012",
                        "cis_csc_v7": [
                            "8.3"
                        ]
                    },
                    "decoder": {
                        "name": "sca"
                    },
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:52:37.609Z",
                    "location": "sca",
                    "id": "1773640357.3009683",
                    "timestamp": "2026-03-15T22:52:37.609-0700"
                },
                "sort": [
                    1773640357609
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "MJ4z9ZwBtQIFeAKvgV00",
                "_score": null,
                "_source": {
                    "predecoder": {
                        "hostname": "kali",
                        "program_name": "lightdm",
                        "timestamp": "Mar 16 05:51:53"
                    },
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "uid": "0",
                        "dstuser": "lightdm"
                    },
                    "rule": {
                        "mail": false,
                        "level": 3,
                        "pci_dss": [
                            "10.2.5"
                        ],
                        "hipaa": [
                            "164.312.b"
                        ],
                        "tsc": [
                            "CC6.8",
                            "CC7.2",
                            "CC7.3"
                        ],
                        "description": "PAM: Login session opened.",
                        "groups": [
                            "pam",
                            "syslog",
                            "authentication_success"
                        ],
                        "nist_800_53": [
                            "AU.14",
                            "AC.7"
                        ],
                        "gdpr": [
                            "IV_32.2"
                        ],
                        "firedtimes": 3,
                        "mitre": {
                            "technique": [
                                "Valid Accounts"
                            ],
                            "id": [
                                "T1078"
                            ],
                            "tactic": [
                                "Defense Evasion",
                                "Persistence",
                                "Privilege Escalation",
                                "Initial Access"
                            ]
                        },
                        "id": "5501",
                        "gpg13": [
                            "7.8",
                            "7.9"
                        ]
                    },
                    "decoder": {
                        "parent": "pam",
                        "name": "pam"
                    },
                    "full_log": "Mar 16 05:51:53 kali lightdm[1010]: pam_unix(lightdm-greeter:session): session opened for user lightdm(uid=124) by (uid=0)",
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:51:56.727Z",
                    "location": "journald",
                    "id": "1773640316.3009241",
                    "timestamp": "2026-03-15T22:51:56.727-0700"
                },
                "sort": [
                    1773640316727
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "L54z9ZwBtQIFeAKvgV00",
                "_score": null,
                "_source": {
                    "predecoder": {
                        "hostname": "kali",
                        "program_name": "(systemd)",
                        "timestamp": "Mar 16 05:51:52"
                    },
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "srcuser": "lightdm",
                        "uid": "0",
                        "dstuser": "lightdm"
                    },
                    "rule": {
                        "mail": false,
                        "level": 3,
                        "pci_dss": [
                            "10.2.5"
                        ],
                        "hipaa": [
                            "164.312.b"
                        ],
                        "tsc": [
                            "CC6.8",
                            "CC7.2",
                            "CC7.3"
                        ],
                        "description": "PAM: Login session opened.",
                        "groups": [
                            "pam",
                            "syslog",
                            "authentication_success"
                        ],
                        "nist_800_53": [
                            "AU.14",
                            "AC.7"
                        ],
                        "gdpr": [
                            "IV_32.2"
                        ],
                        "firedtimes": 2,
                        "mitre": {
                            "technique": [
                                "Valid Accounts"
                            ],
                            "id": [
                                "T1078"
                            ],
                            "tactic": [
                                "Defense Evasion",
                                "Persistence",
                                "Privilege Escalation",
                                "Initial Access"
                            ]
                        },
                        "id": "5501",
                        "gpg13": [
                            "7.8",
                            "7.9"
                        ]
                    },
                    "decoder": {
                        "parent": "pam",
                        "name": "pam"
                    },
                    "full_log": "Mar 16 05:51:52 kali (systemd)[1016]: pam_unix(systemd-user:session): session opened for user lightdm(uid=124) by lightdm(uid=0)",
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:51:56.587Z",
                    "location": "journald",
                    "id": "1773640316.3008793",
                    "timestamp": "2026-03-15T22:51:56.587-0700"
                },
                "sort": [
                    1773640316587
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "Lp4z9ZwBtQIFeAKvgV00",
                "_score": null,
                "_source": {
                    "predecoder": {
                        "hostname": "kali",
                        "program_name": "lightdm",
                        "timestamp": "Mar 16 05:51:52"
                    },
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "uid": "0",
                        "dstuser": "lightdm"
                    },
                    "rule": {
                        "mail": false,
                        "level": 3,
                        "pci_dss": [
                            "10.2.5"
                        ],
                        "hipaa": [
                            "164.312.b"
                        ],
                        "tsc": [
                            "CC6.8",
                            "CC7.2",
                            "CC7.3"
                        ],
                        "description": "PAM: Login session opened.",
                        "groups": [
                            "pam",
                            "syslog",
                            "authentication_success"
                        ],
                        "nist_800_53": [
                            "AU.14",
                            "AC.7"
                        ],
                        "gdpr": [
                            "IV_32.2"
                        ],
                        "firedtimes": 1,
                        "mitre": {
                            "technique": [
                                "Valid Accounts"
                            ],
                            "id": [
                                "T1078"
                            ],
                            "tactic": [
                                "Defense Evasion",
                                "Persistence",
                                "Privilege Escalation",
                                "Initial Access"
                            ]
                        },
                        "id": "5501",
                        "gpg13": [
                            "7.8",
                            "7.9"
                        ]
                    },
                    "decoder": {
                        "parent": "pam",
                        "name": "pam"
                    },
                    "full_log": "Mar 16 05:51:52 kali lightdm[1010]: pam_unix(lightdm-greeter:session): session opened for user lightdm(uid=124) by (uid=0)",
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:51:56.525Z",
                    "location": "journald",
                    "id": "1773640316.3008351",
                    "timestamp": "2026-03-15T22:51:56.525-0700"
                },
                "sort": [
                    1773640316525
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "LZ4z9ZwBtQIFeAKvfV1I",
                "_score": null,
                "_source": {
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "audit": {
                            "uid": "0",
                            "auid": "4294967295",
                            "gid": "0",
                            "exe": "\"/usr/sbin/apparmor_parser\"",
                            "euid": "0",
                            "session": "4294967295",
                            "pid": "1061",
                            "id": "49",
                            "type": "AVC",
                            "directory": {
                                "name": "\"docker-default\""
                            },
                            "command": "\"apparmor_parser\""
                        }
                    },
                    "rule": {
                        "firedtimes": 1,
                        "mail": false,
                        "level": 3,
                        "hipaa": [
                            "164.312.b"
                        ],
                        "pci_dss": [
                            "10.6.1"
                        ],
                        "tsc": [
                            "CC7.2",
                            "CC7.3"
                        ],
                        "description": "Auditd: SELinux permission check.",
                        "groups": [
                            "audit",
                            "audit_selinux"
                        ],
                        "id": "80730",
                        "nist_800_53": [
                            "AU.6"
                        ],
                        "gdpr": [
                            "IV_30.1.g",
                            "IV_35.7.d"
                        ]
                    },
                    "decoder": {
                        "name": "auditd"
                    },
                    "full_log":"type=AVC msg=audit(1773640313.447:49): apparmor=\"STATUS\" operation=\"profile_load\" profile=\"unconfined\" name=\"docker-default\" pid=1061 comm=\"apparmor_parser\" type=SYSCALL msg=audit(1773640313.447:49): arch=c000003e syscall=1 success=yes exit=14409 a0=4 a1=561cb122b530 a2=3849 a3=0 items=0 ppid=1056 pid=1061 auid=4294967295 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=(none) ses=4294967295 comm=\"apparmor_parser\" exe=\"/usr/sbin/apparmor_parser\" subj=unconfined key=(null)ARCH=x86_64 SYSCALL=write AUID=\"unset\" UID=\"root\" GID=\"root\" EUID=\"root\" SUID=\"root\" FSUID=\"root\" EGID=\"root\" SGID=\"root\" FSGID=\"root\" type=PROCTITLE msg=audit(1773640313.447:49): proctitle=61707061726D6F725F706172736572002D4B72002F7661722F6C69622F646F636B65722F746D702F646F636B65722D64656661756C7433373435303336313930",
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:51:56.157Z",
                    "location": "/var/log/audit/audit.log",
                    "id": "1773640316.3007022",
                    "timestamp": "2026-03-15T22:51:56.157-0700"
                },
                "sort": [
                    1773640316157
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "LJ4z9ZwBtQIFeAKveV1e",
                "_score": null,
                "_source": {
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "file": "/usr/bin/chsh",
                        "title": "Trojaned version of file detected."
                    },
                    "rule": {
                        "firedtimes": 6,
                        "mail": false,
                        "level": 7,
                        "pci_dss": [
                            "10.6.1"
                        ],
                        "description": "Host-based anomaly detection event (rootcheck).",
                        "groups": [
                            "ossec",
                            "rootcheck"
                        ],
                        "id": "510",
                        "gdpr": [
                            "IV_35.7.d"
                        ]
                    },
                    "decoder": {
                        "name": "rootcheck"
                    },
                    "full_log": "Trojaned version of file '/usr/bin/chsh' detected. Signature used: 'bash|file\\.h|proc\\.h|/dev/ttyo|/dev/[A-Z]|/dev/[a-s,uvxz]' (Generic).",
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:51:54.380Z",
                    "location": "rootcheck",
                    "id": "1773640314.3006620",
                    "timestamp": "2026-03-15T22:51:54.380-0700"
                },
                "sort": [
                    1773640314380
                ]
            },
            {
                "_index": "wazuh-alerts-4.x-2026.03.16",
                "_id": "K54z9ZwBtQIFeAKveV1e",
                "_score": null,
                "_source": {
                    "agent": {
                        "ip": "10.0.2.15",
                        "name": "kali_laptop",
                        "id": "003"
                    },
                    "manager": {
                        "name": "kali"
                    },
                    "data": {
                        "file": "/bin/chsh",
                        "title": "Trojaned version of file detected."
                    },
                    "rule": {
                        "firedtimes": 5,
                        "mail": false,
                        "level": 7,
                        "pci_dss": [
                            "10.6.1"
                        ],
                        "description": "Host-based anomaly detection event (rootcheck).",
                        "groups": [
                            "ossec",
                            "rootcheck"
                        ],
                        "id": "510",
                        "gdpr": [
                            "IV_35.7.d"
                        ]
                    },
                    "decoder": {
                        "name": "rootcheck"
                    },
                    "full_log": "Trojaned version of file '/bin/chsh' detected. Signature used: 'bash|file\\.h|proc\\.h|/dev/ttyo|/dev/[A-Z]|/dev/[a-s,uvxz]' (Generic).",
                    "input": {
                        "type": "log"
                    },
                    "@timestamp": "2026-03-16T05:51:54.367Z",
                    "location": "rootcheck",
                    "id": "1773640314.3006226",
                    "timestamp": "2026-03-15T22:51:54.367-0700"
                },
                "sort": [
                    1773640314367
                ]
            }
        ]
    }
}



every time exact this data from the response

agent.name
agent.ip
agent.id
rule.id
rule.level
rule.description
rule.groups
@timestamp
location


Event category listed below:

rule.groups             	Meaning
------------                ----------
windows_application	        Windows event
pam	                        authentication
audit_selinux	            security audit
rootcheck	                malware detection
sca	                        security compliance
ossec	                    host monitoring


Save log to Database give formate below
logs model
{
id:uuid
 "device": "kali_laptop",
 "ip": "10.0.2.15",
 "event_type": "authentication",
 "event_description": "PAM: Login session opened",
 "severity": 3,
 "category": "pam",
 "timestamp": "2026-03-16T05:51:56Z"
 createdAt:
}


UBA Dasboard add


Active Devices
Recent Alerts
Authentication Events
Malware Detection
High Risk Devices


OpenSearch
     ↓
fetch alerts
     ↓
extract important fields
     ↓
store in database
     ↓
calculate behaviour metrics
     ↓
generate risk score


Pseudo code:

Alert Type 

if (alert.data?.win) {
   type = "windows_event"
}

else if (alert.rule.groups.includes("pam")) {
   type = "linux_auth"
}

else if (alert.rule.groups.includes("rootcheck")) {
   type = "malware_detection"
}

else if (alert.rule.groups.includes("audit")) {
   type = "security_audit"
}


function calculateBehaviourMetrics(alerts) {

  const metrics = {
    loginCount: 0,
    malwareEvents: 0,
    auditCommands: 0,
    networkChanges: 0
  };

  alerts.forEach(alert => {

    if (alert.event_type === "authentication") {
      metrics.loginCount++;
    }

    if (alert.category === "rootcheck") {
      metrics.malwareEvents++;
    }

    if (alert.category === "audit") {
      metrics.auditCommands++;
    }

    if (alert.location === "netstat listening ports") {
      metrics.networkChanges++;
    }

  });

  return metrics;
}

example output:
{
 "loginCount": 4,
 "malwareEvents": 1,
 "auditCommands": 2,
 "networkChanges": 1
}


Simple Hardcoded Logic
function generateRiskScore(metrics) {

  let score = 0;

  score += metrics.loginCount * 5;
  score += metrics.auditCommands * 10;
  score += metrics.networkChanges * 15;
  score += metrics.malwareEvents * 40;

  let status = "LOW";

  if (score > 70) status = "HIGH";
  else if (score > 40) status = "MEDIUM";

  return {
    riskScore: score,
    status: status
  };
}

Example result:

{
 "riskScore": 75,
 "status": "HIGH"
}


prisma schema


generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum RiskLevel {
  LOW
  MEDIUM
  HIGH
}

model Agent {
  id        String   @id
  name      String
  ip        String
  manager   String?
  createdAt DateTime @default(now())

  alerts     Alert[]
  riskScore  DeviceRisk?

  @@index([name])
}

model Alert {
  id          String   @id @default(uuid())
  wazuhId     String?
  
  agentId     String
  agent       Agent    @relation(fields: [agentId], references: [id])

  eventType   String
  description String
  severity    Int

  category    String?
  location    String?

  sourceIp    String?
  username    String?

  rawLog      Json?

  createdAt   DateTime @default(now())

  @@index([agentId])
  @@index([severity])
  @@index([eventType])
}

model BehaviourMetric {
  id           String   @id @default(uuid())

  agentId      String
  agent        Agent    @relation(fields: [agentId], references: [id])

  loginCount        Int @default(0)
  auditCommandCount Int @default(0)
  networkChanges    Int @default(0)
  malwareEvents     Int @default(0)

  calculatedAt DateTime @default(now())

  @@index([agentId])
}

model DeviceRisk {
  id          String    @id @default(uuid())

  agentId     String    @unique
  agent       Agent     @relation(fields: [agentId], references: [id])

  riskScore   Int
  riskLevel   RiskLevel

  lastUpdated DateTime  @updatedAt

  @@index([riskLevel])
}

model RiskHistory {
  id        String   @id @default(uuid())

  agentId   String
  agent     Agent    @relation(fields: [agentId], references: [id])

  riskScore Int
  riskLevel RiskLevel

  createdAt DateTime @default(now())

  @@index([agentId])
}

model SystemStat {
  id          String   @id @default(uuid())

  totalAlerts Int
  highRisk    Int
  mediumRisk  Int
  lowRisk     Int

  createdAt   DateTime @default(now())
}





You are a senior backend engineer. Build a clean backend API for a demo **User Behavior Analytics (UBA)** system that integrates with **Wazuh alerts stored in OpenSearch**.

Tech stack requirements:

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* Axios (for fetching Wazuh alerts)
* node-cron (for scheduled jobs)

Project goal:

The backend should periodically fetch logs from Wazuh OpenSearch, store them in a database, calculate simple behavior metrics, generate a risk score per device, and expose APIs for a dashboard.

System workflow:

1. Every **1 minute**, fetch the latest alerts from Wazuh OpenSearch.
2. Parse the alert JSON and extract useful fields.
3. Save alerts into the database.
4. Calculate behavior metrics per device.
5. Generate a risk score.
6. Store the risk score in the database.

Important fields extracted from Wazuh alerts:

* agent.name
* agent.ip
* rule.level
* rule.description
* rule.groups
* location
* @timestamp

---

Database models (Prisma):

Agent
Alert
BehaviourMetric
DeviceRisk

Each alert belongs to an Agent.

---

Behavior Metrics Logic (simple hardcoded rules):

Calculate per device:

* login events
* audit commands
* malware/rootcheck alerts
* network port changes

Example scoring rules:

loginCount * 5
auditCommands * 10
networkChanges * 15
malwareEvents * 40

Risk levels:

0-40 → LOW
41-70 → MEDIUM
70+ → HIGH

---

Cron Job

Implement a scheduled job that runs every **1 minute**:

* fetch alerts from Wazuh OpenSearch
* store new alerts only
* recalculate behavior metrics
* update risk score

---

API Routes

1. GET /api/logs

Return paginated logs stored in the database.

Example response:

{
"logs": [
{
"device": "kali_laptop",
"eventType": "authentication",
"severity": 3,
"timestamp": "2026-03-16T05:51:56Z"
}
]
}

---

2. GET /api/alerts/summary

Return a summary count of alerts grouped by severity.

Example response:

{
"totalAlerts": 120,
"highSeverity": 20,
"mediumSeverity": 40,
"lowSeverity": 60
}

---

3. GET /api/devices/risk

Return risk scores for all devices.

Example response:

[
{
"device": "kali_laptop",
"riskScore": 75,
"riskLevel": "HIGH"
}
]

---


jobs should contain the cron job that syncs Wazuh alerts.

---