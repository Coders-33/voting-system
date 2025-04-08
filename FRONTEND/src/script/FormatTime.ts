export function formatTimings(time: number) {
    const dateObj = new Date(time);
    const date = dateObj.getDate().toString().padStart(2, "0");
    const month = dateObj.getMonth().toString().padStart(2, "0");;
    const year = dateObj.getFullYear();

    const votingDateTimes = `${date}/${month}/${year}`;

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const time24 = `${hours}:${minutes}`;


    const formatedHours = convertTo12HourFormat(time24);

    return {
        votingDateTimes,
        formatedHours
    }

}


function convertTo12HourFormat(time24: any) {
    let [hours, minutes] = time24.split(':').map(Number);

    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Converts '0' or '12' to '12'

    minutes = minutes.toString().padStart(2, '0');

    return `${hours}:${minutes} ${period}`;
}


