const {Schema, model} = require('mongoose');
const bcryp = require('bcryptjs');
const UserSchema = new Schema({
    firstname: {
        type: String,
        required :true
    },
    lastname: {
        type: String,
        required : true
    }, 
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }


}, {
    timestamps: true
});

UserSchema.methods.encryp = async password => {
    const salt = await bcryp.genSalt(10);
    return await bcryp.hash(password, salt);

    
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcryp.compare(password, this.password);
}

module.exports = model('User', UserSchema);
