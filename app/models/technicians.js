module.exports = mongoose => {
    const Technicians = mongoose.model(
        "technicians",
        mongoose.Schema(
           {    
                id:{
                    type: Number,
                    required: true,
                    unique: true
                },
                first_name:{
                    type: String,
                    required: true,
                },
                last_name:{
                    type: String,
                    required: true,
                },
                email:{
                    type: String,
                    required: true,
                },
                typeIds:{
                    type: Array,
                    required: true,
                },
                skillsId:{
                    type: Array,
                    required: true,
                },   
                hour_rate:{
                    type: Number,
                    required: true,
                },  
                daily_capacity:{
                    type: Number,
                    required: true,
                },            
            },
        )
    )
    return Technicians;
}

