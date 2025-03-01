const sendForm = async (e) => {
    e.preventDefault();
  
    console.log("hacer fetch...");
    let formData = new FormData(document.getElementById("form-contacto"));
    let nombre = formData.get("nombre");
    let email = formData.get("email");
    let mensaje = formData.get("mensaje");
  
    if (!nombre|| !email || !mensaje) {
      Swal.fire({
        icon: "error",
        background: "white",
        text: "Es necesario completar todos los campos.",
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
          background: "#e5e5e5",
          showConfirmButton: false,
          allowEscapeKey: false,
          toast: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
    let response = await fetch("/api/formulario", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    let data = await response.json();
    console.log(data);
    if (response.ok) {
        Swal.fire({
            icon: "success",
            background: "white",
            text: data.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#575757",
            toast: true,
          });
    } else {
      Swal.fire({
        icon: "error",
        background: "white",
        text:
          data.error ||
          "No fue posible enviar su mensaje.",
        confirmButtonText: "OK",
        confirmButtonColor: "#575757",
        toast: true,
      });
    }
} catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
}