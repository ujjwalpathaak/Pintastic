const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({
    credential: cert({
        "type": "service_account",
        "project_id": "pintastic-6ea0e",
        "private_key_id": "2937b78b531e13db3f8b8d678693ddb6277a3f59",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYUNZxdMQyz8pc\nbsZ2POfqWTAxwIB9V4ALAHAFKkcnKiqAoKdF9fVhjPjRtuoztfAHHCAR0g+YVwd2\nqF9w1ndKIRpVZgkS5hv2SmowZTXw7nIT/XhODaIiWGJnVLQIEBLkr3h3QkHfDfyT\namKliDUOtf/PuQKzFrtzqggEJi63nzYiFR0HZRAvU035ST9AzCEKFVQMPsS7Jsnm\nHSQlXmHClHSt6FpwN7VRhefk+obBPzzC2iTONI4CcoqdprUbIDDWzesm7oUDtIPq\nvDRez3vwXsvkw/rAnRHP1vrERGhiQeqizXKqkeLHKiNk05ffV5ghlWFRbGp8SYzf\nKGju1c/fAgMBAAECggEARoKvLANuUsvFwDSBr5fx1sNkwMrpdzH29F8bpKtfzyXg\n/dWgQN9IMZikoKN5mwqCp6ak03pACB3SOnzuw1a9QqYgsdaVPZpRYgpmq8jJ+POY\nruhv9y1dfMmHpfwHxRsMNYv2/hTUaPNjsd+7MQ8BkH6F2L2LYjoWN0Ek5MlXcBW1\nrtzYo0eM8M+DXI0wPAMSuEDe6zAgGztpG473eJzUm6+6iX7z3npGRIRpYemTZMg9\nIqXqihfpEtTrxEhCD/gCy4pbkH2FeYGbCxWb/xe9fGLVVtQNf1SkZSI1q523eXDw\noRkv4lg3uC1XBODb6PSAZ6zQF0tqB935DuWS5Uiq2QKBgQDy+Ni3PStUiSUlwui3\n6rNLZjzxeJaS2miqoRHXOsy+2sHrj+1YUq4nhm+km/hPgmEN2RWgfT/0z4kT9D7h\n/82o085a7IJfDutKPucpjIoXCmQYteoZONj2u7SP15Pz9b5jcE05JdFFZQ350d/3\nXGMSyISOmBdWv19x96WgPjFSRwKBgQDj6hgKENrNWcFeJNakSU0CJ73pRBRLpn8A\nGD4UpvpJYDGcZuzF+ffduf18547ynfrzbw+P39Mh1tLtWd0wI4lJil6P77pAfNK1\nr/iANeBE+n3N0hZUE763aFkZ7GQbJ/HOdp+61VjUdIi7Ssy+IZt46azmiydFlh+b\nWi++944JqQKBgQCDPBGh93Id+O2Nldco76XkBdbI/j8mFr4N223NeL76HyI638Rs\nvku+oYhPusbF+z/8wNJDmyMeUbJSiswkOYyVscF1ruVD/sTrl0o4UOaNR1mFV0yY\nTvIxYnVGdEQ/su4gu5maUmjUOJ7x3oBAFTCWBqRCeLeybS9aWU6mXLE7JQKBgEts\nVLhAC6iZY1x8ZGvJtipYbIiddvnyB2VIoILFH17Y7pILnZ+GsXg27KRBHRU9Iqcc\nwdGjCIPSS8swSfp8SBqGJ/UKKGDe7fwiV+JV8fnhy3Apbio0vpCDf7kMebRi66qf\npwx1PghQ6E7S2h6xkHnbGtTQiBaHL76Bgft4gRDBAoGBAI7EvTlYW7Sp1kRw6WNB\n2J/VNMX7dJRvLLe3Tm12TDC9+0JHzlL5AN5+Mi+m8DP9tnfhhpuzv0l7tXIYQdwm\nA5/HQr6hhYHY1cHx8KJllt5OELgKVP7ikeeFQtua9Qx1CfbMKQAy14PLzKbkrAqA\n+qpzgs1rWfRTVhi6LEmaO2BS\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-b6bk9@pintastic-6ea0e.iam.gserviceaccount.com",
        "client_id": "101103186805357829409",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b6bk9%40pintastic-6ea0e.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    }
    )
})

const db = getFirestore()

module.exports = { db }