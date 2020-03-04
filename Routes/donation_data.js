module.exports = (app, axios, mydate, createCsvWriter) => {
  var newArr = [];
  app.post("/donates", (req, res) => {
    var text = "DE12";
    var char_list = "1234567890abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 11; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }

    let dict = {
      Date: mydate(),
      Nonprofit: req.body.Nonprofit,
      Donation_Currency: req.body.Donation_Currency,
      Donation_Amount: req.body.Donation_Amount,
      order_id: text
    };
    // res.send(data);
    var csvWriter = createCsvWriter({
      path: "./csv/donation.csv",
      header: [
        { id: "Date", title: "DATE" },
        { id: "Nonprofit", title: "NONPROFIT" },
        { id: "Donation_Currency", title: "DONATION_CURRENCY" },
        { id: "Donation_Amount", title: "DONATION_AMOUNT" }
      ]
    });
    // dict data pushing in a newArr.
    newArr.push(dict);
    csvWriter
      .writeRecords(newArr)
      .then(() => {
        console.log("Data inserted in CSV file!");
        res.send({ Success: "data inserted in CSV file!" });
      })
      .catch((err) => {
          console.log(err);
      })
  });
};
