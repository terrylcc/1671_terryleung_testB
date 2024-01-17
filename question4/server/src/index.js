const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.post("/shipping-fee", (req, res) => {
    const data = req.body;

    shippingFee = 0;

    data.parcels.forEach(parcel => {
        volumetricWeight = (parcel.length * parcel.width * parcel.height) / 5000;
        
        parcelWeight = Math.max(parcel.weight, volumetricWeight)

        if (parcelWeight <= 5 && parcel.temperatureCondition == "Ambient") {
            cost = parcelWeight * 10;
        } else if (parcelWeight > 5 && parcel.temperatureCondition == "Ambient") {
            cost = parcelWeight * 15;
        } else if (parcelWeight <= 5 && parcel.temperatureCondition == "Chill") {
            cost = parcelWeight * 20;
        } else if (parcelWeight > 5 && parcel.temperatureCondition == "Chill") {
            cost = parcelWeight * 30;
        } else {
            console.error("Invalid request");
        }

        totalCost = cost * parcel.quantity;
        shippingFee += totalCost;
    });

    res.send({
        "shippingFee": shippingFee
    })
})

app.listen(port, () => console.log("The server is listening on port", port));