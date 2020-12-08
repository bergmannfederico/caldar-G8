module.exports = mongoose => {
    const boilers = mongoose.model(
        "boilers",
        mongoose.Schema(
            {
                id: Number,
                skillsId: Array,
                description: String,
                stock: Number,
            }, {
                timestamps: true
            }
        )
    );
    return boilers;
};