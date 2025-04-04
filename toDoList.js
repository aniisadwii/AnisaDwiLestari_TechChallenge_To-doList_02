// import fungsi buat nambah dan hapus task dari file taskManager.js
import { addTask, removeTask } from "./taskManager.js";

// kalau page yg ke-load pake jquery udah siap, lanjut jalanin codenya
$(document).ready(() => {
  // data dummy aja, di-set completed = false karena artinya task blm selesai
  let tasks = [
    { id: 1, title: "Create budgeting plan for yearly event", completed: false },
    { id: 2, title: "Design power point presentation", completed: false },
    { id: 3, title: "Finish assignment", completed: false },
    { id: 4, title: "Attend meeting at 19.30 AM", completed: false },
  ];

  // fungsi untuk nampilin ulang semua tasknya biar tetep sync/update
  const renderTasks = () => {
    // kosongin elemen yg punya id task-list di html. dikosongin biar ga numpuk sama task yg lama
    $("#task-list").empty();

    // loop tiap task buat bikin tampilan di html
    tasks.forEach((task) => {
      // syntax $(`,,,`) untuk masukin variabel/logika ke dalam string
      // buat elemen <li> tiap task, kasih class kalau sudah selesai
      // kenapa pake string? lebih cepet dan gampang diliat
      const taskItem = $(`
        <li class="task-item ${task.completed ? "completed" : ""}">
          <input type="checkbox" ${task.completed ? "checked" : ""}>
          <span>${task.title}</span>
          <img src="./assets/close.png" alt="Delete">
        </li>
      `);

      // kasih action ke checkbox, kalau dicentang artinya task selesai
      // caranya? update statusnya, lalu refresh tampilan page
      // kenapa? biar user langsung liat perubahan di layar
      taskItem.find("input[type='checkbox']").on("change", function () {
        // task.completed -> status task yang tadinya di-set false
        // $(this) -> checkbox yg lagi diklik user
        // cek apa checkbox-nya lagi dicentang atau ga. kalo iya? status task(task.completed) true
        // kalau diuncheck, $(this).is(":checked") jadi false, dan task.completed balik ke false
        task.completed = $(this).is(":checked");
        // refresh tampilan 
        renderTasks();
      });

      // kasih action ke icon delete, kalo diklik tasknya hilang
      // caranya? hapus dari daftar, lalu refresh tampilan page
      // kenapa? biar rapi pakai fungsi dari taskManager
      taskItem.find("img").on("click", () => {
        // buang task pake id-nya
        tasks = removeTask(tasks, task.id);
        // refresh tampilan
        renderTasks();
      });

      // tambahin task ke daftar di tampilan page
      $("#task-list").append(taskItem);
    });
  };

  // panggil dulu biar task awal langsung muncul
  // biar user ga bingung pas buka, langsung ada isinya
  renderTasks();

  // kasih action ke tombol buat nambah task
  // caranya? ambil teks dari input, bikin task baru, trus refresh
  // kenapa? biar user bisa nambah task sesuka hati
  $("#add-task-btn").on("click", () => {
    // ambil teks dari input, bersihin dari spasi yg ga perlu
    const taskText = $("#task-input").val().trim();

    // cek kalau inputnya ga kosong, baru bikin task
    // kenapa? biar ga ada task kosong yg nantinya bikin ribet
    if (taskText) {
      // bikin task baru pake id dari waktu sekarang
      // kenapa pake Date.now()? gampang dan id-nya pasti terus beda
      const newTask = {
        id: Date.now(),
        title: taskText,
        completed: false,
      };

      // tambahin task baru ke daftar pake fungsi addTask dari taskManager
      tasks = addTask(tasks, newTask);

      // kosongin input biar siap buat nulis task baru
      // kenapa? biar user tau tasknya udah masuk
      $("#task-input").val("");

      // refresh tampilan page biar task baru keliatan
      renderTasks();
    }
  });
});