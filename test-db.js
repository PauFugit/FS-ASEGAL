const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'srv26.cpanelhost.cl',
  user: 'cas110594_asegalUSER',
  password: 'Asesoria123',
  database: 'cas110594_asegalDB',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión:', err.message);
  } else {
    console.log('✅ ¡Conexión exitosa a la base de datos!');
  }
  connection.end();
});
