export default function limitString(string : string) {
    return string.length > 100 ? string.slice(0, 100) + "..." : string;
}