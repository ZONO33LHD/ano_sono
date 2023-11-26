import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Nav_bar from "./components/Layout/NavBar/Nav_bar";

export default function Page() {
  return (
    <main>
      <Nav_bar />
      <div>
        <h1>Hello</h1>
        <div>
          <AddTask />
          <TaskList />
        </div>
      </div>
    </main>
  );
}
