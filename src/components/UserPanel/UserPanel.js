import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { UserContext } from "../../contexts/AuthContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import Spinner from "../ui/Spinner";
import { ThemeContext } from "../../contexts/ThemeContext";
import "../UserPanel/UserPanel.css";

/*
Roles:
1-user
2-admin
3-sysadmin

Agregar:
4-disabled
*/

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const { token } = useContext(UserContext);
  const { toggleLoading, isLoading } = useContext(LoaderContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    toggleLoading(true);
    fetch(`https://localhost:44377/api/User/GetUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error("Error al traer users:", error);
      });
  };

  const filterUserTable = (users) => {
    if (selectedOption === "all") {
      return users;
    } else if (selectedOption === "users") {
      return users.filter((users) => users.roleId !== 2 && users.roleId !== 3);
    } else if (selectedOption === "admins") {
      return users.filter((users) => users.roleId !== 1 && users.roleId !== 3);
    }
    return [];
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChangeRole = (userId) => {
    fetch(
      `https://localhost:44377/api/User/UpdateUserRole/${userId}/${parseInt(
        selectedRoleId
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("Rol cambiado con éxito");
        } else {
          if (response.status === 404) {
            throw new Error("No se pudo actualizar rol");
          } else {
            throw new Error("Hubo un problema en el servidor");
          }
        }
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        console.log(error);
      });
    closeModal();
  };

  const handleDisableUser = (userId) => {
    fetch(`https://localhost:44377/api/User/UpdateUserRole/${userId}/4`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Usuario deshabilitado");
        } else {
          if (response.status === 404) {
            throw new Error("No se pudo deshabilitar usuario");
          } else {
            throw new Error("Hubo un problema en el servidor");
          }
        }
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        console.error(error);
      });
    closeModal();
  };

  const openChangeRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRoleId(user.roleId.toString());
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

  const filteredUserTable = filterUserTable(users);
  console.log(filteredUserTable);
  return (
    <>
      <NavBar />
      <div
        className={`d-flex flex-column flex-wrap ${
          theme === "dark" && "user-panel-dark"
        }`}
      >
        <h2 className="mx-auto pt-5 pb-3">Panel de Usuarios</h2>
        <div
          className="d-flex mx-auto justify-content-center pb-5 input-group"
          style={{ maxWidth: 650 }}
        >
          <label className="input-group-text">Ver:</label>

          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="form-select"
          >
            <option value="all">Todos</option>
            <option value="users">Usuarios</option>
            <option value="admins">Administradores</option>
          </select>
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center p-5 vh-100">
            <Spinner />
          </div>
        ) : (
          <div className="pb-4 mx-auto table-responsive img-fluid">
            <table className="">
              <thead>
                <tr>
                  <th className="px-5">Email</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th className="px-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUserTable
                  .filter((u) => u.roleId !== 3)
                  .map((user) => (
                    <tr key={user.id}>
                      <td className="px-5 border-bottom">{user.email}</td>
                      <td className="pe-4 border-bottom">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="border-bottom pe-3">
                        {user.roleId === 2
                          ? "Administrador"
                          : user.roleId === 1
                          ? "Usuario"
                          : "Deshabilitado"}
                      </td>
                      <td className="border-bottom">
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
                  value="2"
                  className="m-2"
                  checked={selectedRoleId === "2"}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                />
                Administrador
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="1"
                  className="m-2"
                  checked={selectedRoleId === "1"}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
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
