export function useUserTasks() {
    const data = JSON.parse(localStorage.getItem("miningUserData"))
    const userTarif = data.userSubscription

    if (userTarif === "standard") {
        return data.activeTasks
    } else {
        // Фильтруем задачи по условию is_required === 1
        return data.activeTasks.filter(task => task.is_required === 1);
    }
}
