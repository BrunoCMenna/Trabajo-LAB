# Trabajo-LAB-4
Integrantes: Tobías Fernandez, Bruno Menna, Matias Ruiz

# Resumen
Nuestro trabajo es un una tienda virtual de celulares, en la que manejamos 4 tipos de usuarios, Administradores, SysAdmin, Usuarios e invitados.
Nuestra web presenta una vista pública de los productos, pero requiere loguearse para realizar una compra y acceder a un historial de estas.
Cuando se eligen los productos se almacenan en un carrito, que al comprar desde este pedirá los datos del usuario para realizar el pedido que comienza como Pendiente. Los administradores pueden actualizar el estado de estos.
Los Administradores pueden agregar nuevos productos, manejar los pedidos de los usuarios y tener 2 resumenes gráficos de las estadisticas de venta.
El sysAdmin puede crear nuevos administradores y realizar las actividades de los demas administradores.
Tenemos un apartado de Preguntas Frecuentes, pero también contamos con un soporte via WhatsApp, redirigiendo a los usuarios a este en caso de necesitar aclarar mas dudas. 

# Ubicacion de requisitos TPI
# FrontEnd

Custom Hooks: se encuentran en TopProducts.js y {2do CH}
Testing Unitario: se le realizó al componente {}
Componente de chat: se encuentra en la carpeta SupportPopup
Contamos con modo oscuro en toda la web

# BackEnd

https://github.com/BrunoCMenna/API-TrabajoPractico-Prog

Contamos con 3 ABM (usuarios, productos, pedidos)
Contamos con permisos sobre los endpoints acorde a los roles
Tenemos 4 tipo de Roles
Utilizamos JWT para el sistema de registro y login de nuestros usuarios
Como consulta compleja implementamos GetTopProducts (backend) y la utilizamos en TopProducts (frontend)
La implementacion del patron visto en clase fue utilizada en {}