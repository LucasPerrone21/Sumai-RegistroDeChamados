export default function autodate() {
    const dateInput = document.querySelector("#data");
    const date = new Date();
    dateInput.value = date.toISOString().split("T")[0];
}