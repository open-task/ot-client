export default function getId() {
    return parseInt(Date.parse(new Date())) + "" + parseInt(Math.random() * 10000);
}