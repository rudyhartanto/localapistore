# API Integration Store

API integrasi ini di gunakan untuk membuat koneksi data dari POS ke Master Database Store yang akan di gunakan untuk :

    - View Aplikasi Packer
    - View Aplikasi Customer
    - View Aplikasi Taking Order
    - Pengiriman data ke HokBen Cloud API

## Documentation

- API Middleware menggunakan Node JS
- API di jalankan di services windows
- API menggukana database MySql local HBDB_StoreIntServer
- Database menggunakan user dan password standart Hokben

### Reqruitment Installation

- Node JS

#### How To Install
    - Download and Restore apiserver_db.sql
    - Create Folder C:\apiserver
    - Download file github dan extract ke C:\apiserver
    - Change config.json rule database with current database apiserver_db has been Restored
    - copy runserver.vbs ke start up windows
    - Restart 