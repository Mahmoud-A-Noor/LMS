export function deleteLesson(formData: FormData) {
    const id = formData.get("id")
    if (typeof id !== "string") {
        return
    }
    fetch(`/api/lessons/${id}`, {
        method: "DELETE",
    })
}