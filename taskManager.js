// buat nambah task baru 
// caranya? bikin array baru pakai semua task lama + task baru
// kenapa? biar array lama ga berubah, dan bikin yang baru aja
export const addTask = (tasks, newTask) => {
  return [...tasks, newTask];
};

// buat hapus task dari daftar pake id
// caranya? saring array, cuma simpen task yg id-nya beda sama yg mau dihaous
// kenapa? biar gampang buang task yg udh ga diperluin
export const removeTask = (tasks, id) => {
  return tasks.filter((task) => task.id !== id);
};
