module.exports = (app, axios, csv) => {
    app.put("/convert_amount/:base", (req, res) => {
        let base = req.params.base;
        axios.get('https://api.exchangeratesapi.io/latest?base=' + base)
            .then((data) => {
                // var alldata = CircularJSON.stringify(data.data.rates);
                var alldata = (data.data.rates)
                // console.log(alldata);
                csv().fromFile('./csv/donation.csv')
                .then((data) => {
                    // res.send(data);
                    for (var i of data){
                        var Donation_Currency = i.DONATION_CURRENCY;
                        for (var [key, value] of Object.entries(alldata)){
                            if (Donation_Currency == key){
                                if(value<0){
                                    i.DONATION_AMOUNT = i.DONATION_AMOUNT*value +" "+ base
                                    // console.log(i.DONATION_AMOUNT);
                                }else{
                                    i.DONATION_AMOUNT = i.DONATION_AMOUNT/value +" "+ base
                                    // console.log(i.DONATION_AMOUNT)
                                }
                            } 
                        }
                    }
                    console.log(data);
                    res.send(data);
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
    })
}
