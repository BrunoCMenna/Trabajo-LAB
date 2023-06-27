import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

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

  const handleChangeRole = (userId) => {
    console.log(selectedRole);
    const userRef = ref(getDatabase(), `users/${userId}`);
    const newRole = selectedRole;

    update(userRef, { role: newRole })
      .then(() => {
        toast.success("Permiso cambiado con éxito", {
          position: toast.POSITION.TOP_CENTER,
        });
        // El usuario debe reiniciar sesión para aplicar cambios
        console.log("Rol actualizado exitosamente");
        setShowChangeRoleModal(false);
      })
      .catch((error) => {
        console.error("Error al actualizar el rol:", error);
      });
  };

  const handleDisableUser = (userId) => {
    const userRef = ref(getDatabase(), `users/${userId}`);

    update(userRef, { role: "disabled" })
      .then(() => {
        toast.success("Usuario deshabilitado con éxito", {
          position: toast.POSITION.TOP_CENTER,
        });
        setShowDisableModal(false);
      })
      .catch((error) => {
        console.error("Error al deshabilitar el usuario:", error);
      });
  };

  const openChangeRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setShowChangeRoleModal(true);
  };

  const openDisableModal = (user) => {
    setSelectedUser(user);
    setShowDisableModal(true);
  };

  const closeModal = () => {
    setShowChangeRoleModal(false);
    setShowDisableModal(false);
  };

  return (
    <>
      <NavBar />
      <div className="d-flex flex-column w-50 mx-auto">
        <h2 className="d-flex justify-content-center mt-3">
          Panel de Usuarios
        </h2>
        <hr />
        {users == null ? (
          <div>No hay usuarios disponibles</div>
        ) : (
          <div className="user-list d-flex flex-wrap gap-4 mb-4">
            {users
              .filter((u) => u.role !== "sysadmin")
              .map((user) => (
                <div
                  key={user.id}
                  className="user-row container-fluid card w-50 d-flex justify-content-center align-items-center"
                >
                  <div>{user.email}</div>
                  <div>
                    Rol:{" "}
                    {user.role === "admin"
                      ? "Administrador"
                      : user.role === "user"
                      ? "Usuario"
                      : "Deshabilitado"}
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => openChangeRoleModal(user)}
                    >
                      Cambiar rol
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => openDisableModal(user)}
                    >
                      Deshabilitar
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Change Role Modal */}
      <Modal show={showChangeRoleModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  className="m-2"
                  checked={selectedRole === "admin"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                Administrador
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  className="m-2"
                  checked={selectedRole === "user"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                Usuario
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => handleChangeRole(selectedUser.id)}
          >
            Cambiar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Disable User Modal */}
      <Modal show={showDisableModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deshabilitar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea deshabilitar al usuario:{" "}
          {selectedUser && selectedUser.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDisableUser(selectedUser.id)}
          >
            Deshabilitar
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default UserPanel;
