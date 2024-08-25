import toast from 'react-hot-toast';
export const notify = (msg, status) => {
    toast[status](msg,
        {
            duration: 2500,
            iconTheme: {
                primary: status === "success" ? '#6947BF' : "#FF0000",
                secondary: '#fff',
            }
        });
}