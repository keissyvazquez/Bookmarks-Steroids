var env       = process.env.NODE_ENV || 'development';
var config    = require('./config.json')[env];

console.log(config);
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database is connected ... nn");
  })
  .catch(err => {
    console.log("Error connecting database ... nn");
  });

const Users = sequelize.define('users', {
	  id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	  },
	  first_name: {
	    type: Sequelize.STRING
	  },
	  last_name: {
	    type: Sequelize.STRING
	  },
	  email: {
	    type: Sequelize.STRING
	  },
	  password: {
	    type: Sequelize.STRING
	  }
	}, {
		createdAt: 'created',
  		updatedAt: 'modified'
	}
);

const Urls = sequelize.define('urls', {
	  url_id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	  },
	  user_id: {
	    type: Sequelize.INTEGER,
	    references: {
	     // This is a reference to another model
	     model: Users,

	     // This is the column name of the referenced model
	     key: 'id',

	     // This declares when to check the foreign key constraint. PostgreSQL only.
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	  },
	  url: {
	    type: Sequelize.STRING
	  },
	  title: {
	    type: Sequelize.STRING
	  },
	  description: {
	    type: Sequelize.STRING
	  },
	  category: {
	    type: Sequelize.STRING
	  },
	  tags: {
	    type: Sequelize.STRING
	  }
	}, {
  		timestamps: false
  	}
);

module.exports.Users = Users;
module.exports.Urls = Urls;