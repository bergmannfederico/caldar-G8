module.exports = mongoose => {
    const Technicians = mongoose.model(
        "technicians",
        mongoose.Schema(
           {    
                id:{
                    type: Number,
                },
                first_name:{
                    type: String,
                },
                last_name:{
                    type: String,
                },
                email:{
                    type: String,
                },
                typeIds:{
                    type: [],
                },
                skillsId:{
                    type: [],
                },   
                hour_rate:{
                    type: String,
                },  
                daily_capacity:{
                    type: Number,
                },            
            },
        )
    )
    return Technicians;
}

