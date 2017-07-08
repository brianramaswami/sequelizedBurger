//Export Burgers Model and accepts sequlize and datatypes as parameters
module.exports = function(sequelize,DataTypes) {
    var Burgers = sequelize.define("Burgers",{
        burger_name:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len:{
                    args:[1,100],
                    msg:'Please enter a burger name. Name can not be empty.'
                },
                isAlpha:{
                    args:true,
                    msg:'Please enter only letters. Can not use numbers or symbols for burger name.'
                }
            }
        },
        devoured:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        timestamps:false
    });

    Burgers.associate = (models)=>{
        Burgers.belongsTo(models.Persons,{
            foreignKey:{
                allowNull:true
            }
        });
    }

    return Burgers;
};