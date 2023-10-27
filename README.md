# Trabajo-LAB-4
Integrantes: Tobías Fernandez, Bruno Menna, Matias Ruiz

# Resumen
Nuestro trabajo es un una tienda virtual de celulares, en la que manejamos 4 tipos de usuarios: Administradores, SysAdmin, Usuarios e invitados. <br />
Nuestra web presenta una vista pública de los productos, pero requiere loguearse para realizar una compra y acceder a un historial de estas. <br />
Cuando se eligen los productos se almacenan en un carrito, que al comprar desde este pedirá los datos del usuario para realizar el pedido que comienza como Pendiente. Los administradores pueden actualizar el estado de estos. <br />
Los Administradores pueden agregar nuevos productos, manejar los pedidos de los usuarios y tener 2 resumenes gráficos de las estadisticas de venta. <br />
El sysAdmin puede crear nuevos administradores y realizar las actividades de los demas administradores. <br />
Tenemos un apartado de Preguntas Frecuentes, pero también contamos con un soporte via WhatsApp, redirigiendo a los usuarios a este en caso de necesitar aclarar mas dudas.  <br />

# Ubicacion de requisitos TPI
# FrontEnd

Custom Hooks: se encuentran en TopProducts.js y {2do CH} <br />
Testing Unitario: se le realizó al componente {} <br />
Componente de chat: se encuentra en la carpeta SupportPopup <br />
Contamos con modo oscuro en toda la web <br />

# BackEnd

https://github.com/BrunoCMenna/API-TrabajoPractico-Prog <br />

Contamos con 3 ABM (usuarios, productos, pedidos) <br />
Contamos con permisos sobre los endpoints acorde a los roles <br />
Tenemos 4 tipo de Roles: Administradores, SysAdmin, Usuarios e invitados <br />
Utilizamos JWT para el sistema de registro y login de nuestros usuarios <br />
Como consulta compleja implementamos GetTopProducts (backend) y la utilizamos en TopProducts (frontend) <br />
La implementacion del patron visto en clase fue utilizada en {} <br />