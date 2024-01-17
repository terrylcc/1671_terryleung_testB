<template>
  <div class="calculator">
    <h1>Shipping Fee Calculator</h1>
    <div class="condition">
        <div>Temperature Condition:</div>
        <select v-model="temperatureCondition">
            <option>Ambient</option>
            <option>Chill</option>
        </select>
    </div>
    <div class="form">
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Length (cm)</th>
                    <th>Width (cm)</th>
                    <th>Height (cm)</th>
                    <th>Weight (kg)</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="parcel in parcels" :key="parcel.id">
                    <td>
                        #{{ parcel.id }}
                    </td>
                    <td>
                        <input v-model="parcel.length" placeholder="0" type="number" />
                    </td>
                    <td>
                        <input v-model="parcel.width" placeholder="0" type="number" />
                    </td>
                    <td>
                        <input v-model="parcel.height" placeholder="0" type="number" />
                    </td>
                    <td>
                        <input v-model="parcel.weight" placeholder="0" type="number" />
                    </td>
                    <td>
                        <input v-model="parcel.quantity" placeholder="" type="number" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="actions">
        <button @click="addParcel">
            Add entry
        </button>
        <button @click="dropParcel">
            Drop entry
        </button>
    </div>
    <div class="submit">
        <button @click="calculateShippingFee">
            Submit
        </button>
    </div>
    <div class="result">
        <h2>Total shipping fee: HKD {{ shippingFee }}</h2>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: 'ShippingFeeCalculator',
  props: {
    msg: String
  },
  setup() {
    const shippingFee = ref(0);

    const temperatureCondition = ref("Ambient");

    const parcels = ref([
        {
            "id": 1,
            "length": 0,
            "width": 0,
            "height": 0,
            "weight": 0,
            "quantity": 1,
        },
    ])

    const addParcel = () => {
        parcels.value.push({
            "id": parcels.value.length + 1,
            "length": 0,
            "width": 0,
            "height": 0,
            "weight": 0,
            "quantity": 1,
        })
    }

    const dropParcel = () => {
        if (parcels.value.length > 1) {
            parcels.value.pop()
        }
    }
    
    const calculateShippingFee = async () => {
        const data = await axios.post(
            "http://localhost:3000/shipping-fee",
            {
                "parcels": parcels.value.map((parcel) => ({
                    "length": parcel.length,
                    "width": parcel.width,
                    "height": parcel.height,
                    "weight": parcel.weight,
                    "temperatureCondition": temperatureCondition.value,
                    "quantity": parcel.quantity,
                }))
            }
        ).then((res) => res.data);

        console.log(data)

        shippingFee.value = data.shippingFee;
    }

    return {
        shippingFee,
        temperatureCondition,
        parcels,
        addParcel,
        dropParcel,
        calculateShippingFee,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.condition {
    padding: 1rem 0;

    display: flex;
    align-items: center;
    justify-content: center;
}
select {
    margin: 0 0.8rem;
    padding: 0 0.4rem;
    border-radius: 0.8rem;
}
.form {
    display: flex;
    align-items: center;
    justify-content: center;
}
th {
    padding: 0.3rem 0.8rem;
}
td {
    padding: 0.3rem 0.8rem;
}
.actions {
    padding: 1rem 0;

    display: flex;
    align-items: center;
    justify-content: center;
}
button {
    margin: 0 0.8rem;
    padding: 0 0.8rem;
    border-radius: 0.8rem;
}
.submit {
    padding: 1rem 0;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
