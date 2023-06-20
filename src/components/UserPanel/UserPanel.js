import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { toast } from "react-toastify";

const UserPanel = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    const usersRef = ref(getDatabase(), "users");

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (!usersData) {
        setUsers(null);
      } else {
        const usersList = Object.entries(usersData).map(
          ([userId, userData]) => ({
            id: userId,
            email: userData.email,
            role: userData.role,
          })
        );
        setUsers(usersList);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeRole = (userId, newRole) => {
    const userRef = ref(getDatabase(), `users/${userId}`);

    update(userRef, { role: newRole })
      .then(() => {
        toast.success("Permiso cambiado con éxito", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Rol actualizado exitosamente");
      })
      .catch((error) => {
        console.error("Error al actualizar el rol:", error);
      });
  };
  return (
    <div>
      <h2>Panel de Usuarios</h2>
      {users == null ? (
        <div>No hay usuarios disponibles</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>{user.email}</span>
              <select
                value={user.role}
                onChange={(event) =>
                  handleChangeRole(user.id, event.target.value)
                }
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPanel;
