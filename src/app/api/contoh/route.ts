let hitung = 0;
export async function GET(){
    const { readable, writable } = new TransformStream()
    setInterval(() => {
        hitung ++;
    }, 1000)

    // ??
    return 
}