import { render, screen, act, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { ChallengeComponent } from "./ChallengeComponent.tsx";
import { TasksProvider } from "./contexts/TasksContext.tsx";
import { CATEGORIES, INITIAL_TASKS } from "./utils/consts.ts";

describe("ChallengeComponent", () => {
  it("renders the challenge component", () => {
    render(
      <TasksProvider>
        <ChallengeComponent />
      </TasksProvider>
    );
    expect(screen.getByPlaceholderText("Add task")).toBeInTheDocument();
    expect(screen.getByText(CATEGORIES[0])).toBeInTheDocument();
  });

  it("creates a task and verifies it's been created in Todo column", async () => {
    const user = userEvent.setup();
    render(
      <TasksProvider>
        <ChallengeComponent />
      </TasksProvider>
    );

    const testTaskTitle = "Test Task";
    const input = screen.getByPlaceholderText("Add task");
    const addButton = screen.getByRole("button", { name: "+" });

    await act(async () => {
      await user.type(input, testTaskTitle);
      await user.click(addButton);
    });

    const todoColumn = screen.getByText(CATEGORIES[0]).closest("div");
    expect(todoColumn).toBeInTheDocument();
    expect(within(todoColumn!).getByText(testTaskTitle)).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it(`cannot move left from ${CATEGORIES[0]} column`, async () => {
    render(
      <TasksProvider>
        <ChallengeComponent />
      </TasksProvider>
    );

    const column = screen.getByText(CATEGORIES[0]).closest("div");
    const task = within(column!).getByText(INITIAL_TASKS[0][0].title);
    const leftButton = task.parentElement!.querySelector("button");
    
    expect(leftButton).toBeDisabled();
  });

  it.each(CATEGORIES.slice(0, -1).map((category, index) => [category, index, INITIAL_TASKS[index][0].title]))(
    "can move right from %s column",
    async (_categoryName, categoryIndex, taskTitle) => {
      const user = userEvent.setup();
      render(
        <TasksProvider>
          <ChallengeComponent />
        </TasksProvider>
      );

      const fromColumn = screen.getByText(CATEGORIES[categoryIndex]).closest("div");
      const task = within(fromColumn!).getByText(taskTitle);
      const buttons = task.parentElement!.querySelectorAll("button");
      const rightButton = buttons[buttons.length - 1];
      
      expect(rightButton).not.toBeDisabled();

      await act(async () => {
        await user.click(rightButton);
      });

      const toColumn = screen.getByText(CATEGORIES[categoryIndex + 1]).closest("div");
      expect(within(toColumn!).getByText(taskTitle)).toBeInTheDocument();
      expect(within(fromColumn!).queryByText(taskTitle)).not.toBeInTheDocument();
    }
  );

  it.each(CATEGORIES.slice(1).map((category, index) => [category, index + 1, INITIAL_TASKS[index + 1][0].title]))(
    "can move left from %s column",
    async (_categoryName, categoryIndex, taskTitle) => {
      const user = userEvent.setup();
      render(
        <TasksProvider>
          <ChallengeComponent />
        </TasksProvider>
      );

      const fromColumn = screen.getByText(CATEGORIES[categoryIndex]).closest("div");
      const task = within(fromColumn!).getByText(taskTitle);
      const buttons = task.parentElement!.querySelectorAll("button");
      const leftButton = buttons[0];
      
      expect(leftButton).not.toBeDisabled();

      await act(async () => {
        await user.click(leftButton);
      });

      const toColumn = screen.getByText(CATEGORIES[categoryIndex - 1]).closest("div");
      expect(within(toColumn!).getByText(taskTitle)).toBeInTheDocument();
      expect(within(fromColumn!).queryByText(taskTitle)).not.toBeInTheDocument();
    }
  );

  it(`cannot move right from ${CATEGORIES[CATEGORIES.length - 1]} column`, async () => {
    render(
      <TasksProvider>
        <ChallengeComponent />
      </TasksProvider>
    );

    const lastIndex = CATEGORIES.length - 1;
    const column = screen.getByText(CATEGORIES[lastIndex]).closest("div");
    const task = within(column!).getByText(INITIAL_TASKS[lastIndex][0].title);
    const buttons = task.parentElement!.querySelectorAll("button");
    const rightButton = buttons[buttons.length - 1];
    
    expect(rightButton).toBeDisabled();
  });
});
