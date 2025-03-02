const sendForm = async (e) => {
    e.preventDefault();
  
    let formData = new FormData(document.getElementById("form-contacto"));
    let nombre = formData.get("nombre");
    let email = formData.get("email");
    let mensaje = formData.get("mensaje");
  
    if (!nombre|| !email || !mensaje) {
      Swal.fire({
        icon: "error",
        background: "#f4f4f4",
        text: "Por favor, complete todos los campos.",
        color:"black",
        confirmButtonText: "OK",
        confirmButtonColor: "#575757",
        toast: true,
      });
      return;
    }
  
    let body = {
      nombre,
      email,
      mensaje,
    };

    try {
        Swal.fire({
          text: "Enviando su mensaje...",
          icon: "info",
          background: "#f4f4f4",
          color:"black",
          showConfirmButton: false,
          allowEscapeKey: false,
          toast: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
    let response = await fetch("/api/formulario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    let data = await response.json();
    if (response.ok) {
        Swal.fire({
            icon: "success",
            background: "#f4f4f4",
            color:"black",
            text: data.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#575757",
            toast: true,
          });
          // Limpiar formulario después de envío exitoso
      document.getElementById("form-contacto").reset();
    } else {
      Swal.fire({
        icon: "error",
        background: "#f4f4f4",
        color:"black",
        text: data.error || "No fue posible enviar su mensaje.",
        confirmButtonText: "OK",
        confirmButtonColor: "#575757",
        toast: true,
      });
    }
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    Swal.fire({
      icon: "error",
      background: "#f4f4f4",
      color:"black",
      text: "Error inesperado. Intente nuevamente.",
      confirmButtonText: "OK",
      confirmButtonColor: "#575757",
      toast: true,
    });
  }
};