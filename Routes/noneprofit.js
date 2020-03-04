module.exports = (app, axios, csv, createCsvWriter) => {
  var NonprofitArr = [];
  app.get("/nonprofit/USD", (req, res) => {
    var base = "USD";
    axios
      .get("https://api.exchangeratesapi.io/latest?base=" + base)
      .then(data => {
        var alldata = data.data.rates;
        // console.log(alldata);
        csv()
          .fromFile("./csv/donation.csv")
          .then(data => {
            // res.send(data);
            for (var i of data) {
              var Donation_Currency = i.DONATION_CURRENCY;
              for (var [key, value] of Object.entries(alldata)) {
                if (Donation_Currency == key) {
                  if (value < 0) {
                    i.DONATION_AMOUNT = i.DONATION_AMOUNT * value;
                  } else {
                    i.DONATION_AMOUNT = i.DONATION_AMOUNT / value;
                  }
                }
              }
            }
            // res.send(data);
            var Nonprofit_names_data = [];
            for (var j of data) {
              var count_number = 0;
              if (!Nonprofit_names_data.includes(j.NONPROFIT)) {
                Nonprofit_names_data.push(j.NONPROFIT);
                // console.log(Nonprofit_names_data);
                for (var k of data) {
                  if (j.NONPROFIT == k.NONPROFIT) {
                    if (count_number > 0) {
                      j.DONATION_AMOUNT += k.DONATION_AMOUNT;
                      count_number += 1;
                    } else {
                      count_number += 1;
                    }
                  }
                }
                var dict = {
                  Nonprofit: j.NONPROFIT,
                  Donation_Amount: j.DONATION_AMOUNT +" "+ base,
                  Numbers_of_Donations: count_number
                };
                console.log(dict);
                var csvWriter = createCsvWriter({
                  path: "./csv/nonprofit_data.csv",
                  header: [
                    { id: "Nonprofit", title: "NONPROFIT" },
                    { id: "Donation_Amount", title: "DONATION_AMOUNT" },
                    { id: "Numbers_of_Donations", title: "NUMBERS_OF_DONATIONS"}
                  ]
                });
                // dict data pushing in a NonprofitArr.
                NonprofitArr.push(dict);
                csvWriter
                  .writeRecords(NonprofitArr)
                  .then(() => {
                    console.log("Data inserted in CSV file!");
                    res.send({ Success: "data inserted in CSV file!" });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            }
            // res.send(NonprofitArr);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
