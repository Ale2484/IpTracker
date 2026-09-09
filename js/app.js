document.addEventListener("DOMContentLoaded", () => {
    const searchIpForm = document.getElementById("searchIpForm");
    let ip = searchIpForm.querySelector("#ip");
    let submitButton = searchIpForm.querySelector("button[type=submit]");
    let resultContainer = document.getElementById("resultContainer");
    let infoContainer = document.querySelector("#infoContainer");
    let basicInfo = resultContainer.querySelector("#basicInfo");
    let resultInfo = resultContainer.querySelector("#resultInfo");
    let resultText = resultContainer.querySelector("#resultText");
    let resultDate = resultContainer.querySelector("#resultDate");

    /* Event listener en el boton de submit */
    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const result = await getIpData(ip.value);
        /* Si la peticion ha funcionado */
        if (result && result.status === "success") {
            console.log(result)
            displayData(result);
        }
    });

    /* Funcion que obtiene los datos de una IP */
    async function getIpData(ipAdress){
        try {
            const response = await fetch(`http://ip-api.com/json/${ipAdress}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    /* Funcion que dibuja las cards del resultado */
    function createInfoCard(title, value, icon) {
        return `
            <div class="bg-[#18202C] rounded-lg flex items-center gap-10 p-4">
                <div class="text-[#468AF4]">
                    ${icon}
                </div>

                <div class="flex flex-col">
                    <p class="text-[#8C96A5] text-sm">${title}</p>
                    <p class="text-white">${value}</p>
                </div>
            </div>
        `;
    }


    /* Funcion que muestra los datos obtenidos en la pagina */
    function displayData(data){
        const now = new Date();
        const date = now.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric"});
        const hour = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit"});

        resultText.textContent = "Información encontrada"
        resultDate.textContent = `Consulta realizada el ${date}, ${hour}`

        resultInfo.classList.remove("hidden");
        resultContainer.classList.replace("bg-[#18202C]", "bg-[#0D1722]");
        /* Se elimina el contenido si se ha hecho una busqueda previa */
        let cardsContainer = document.getElementById("cardsContainer");
        if (cardsContainer) {
            cardsContainer.remove();
        }
        resultContainer.insertAdjacentHTML("beforeend",`
             <div id="cardsContainer" class="col-span-full row-span-6 grid md:grid-cols-3 grid-cols-1 gap-3 p-5">
                ${createInfoCard("Direccion IP", data.query, '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /> </svg>')}
                ${createInfoCard("Proveedor (ISP)", data.isp, '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10"> <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" /> </svg>')}
                ${createInfoCard("Ubicación", data.query, "test2")}
                ${createInfoCard("Pais", data.country, '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10"> <path stroke-linecap="round" stroke-linejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" /> </svg>')}
                ${createInfoCard("test", "test1", "test2")}
             </div>
        `)
        basicInfo.classList.add("hidden");
    }

});