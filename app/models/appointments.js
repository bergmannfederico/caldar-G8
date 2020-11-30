module.exports = mongoose => {
    const appointments = mongoose.model(
        "appointments",
        mongoose.Schema(
           {    // These fields were added as an example. Replace them with the right ones.
                id: {
                    type: Number,
                    required: true,
                    unique: true
                },
                buildingId:{
                    type: Number,
                    required: true,
                },
                boilerId:{
                    type: Number,
                    required: true,
                },             
                start_timestamp: Number,
                end_timestamp: Number
            },
        )
    )
    return appointments;
}