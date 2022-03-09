import Sequelize from "sequelize";
import sequelize from "../config/db.js";

const Tasks = sequelize.define("tasks", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tittle: {
        type: Sequelize.STRING,
        required: true,
    },
    description: {
        type: Sequelize.STRING,
        required: true,
    },
});

export default Tasks;