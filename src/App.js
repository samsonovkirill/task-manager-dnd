import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Item, Handle } from './components/Container';
import './App.css';

class App extends React.Component {
  state = {
    tasks: {
      1: { id: 1, text: 'Racing car sprays burning fuel into crowd.'},
      2: { id: 2, text: 'Japanese princess to wed commoner.'},
      3: { id: 3, text: 'Australian walks 100km after outback crash.'},
      4: { id: 4, text: 'Man charged over missing wedding girl.'},
      5: { id: 5, text:  'Los Angeles battles huge wildfires.'},
    },
    taskIds: [1, 2, 3, 4, 5],
    columns: {
      'todo': { id: 'todo', taskIds: [1, 2, 3, 4], header: 'To do'},
      'inprogress': { id: 'inprogress', taskIds: [], header: 'In Progress'},
      'done': { id: 'done', taskIds: [5], header: 'Done' }
    },
    columnIds: ['todo', 'inprogress', 'done']
  }

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;
    // Moving in one column
    if (start === finish) {
      const taskIdsForColumn = this.state.columns[start].taskIds.slice(0);
      const [removed] = taskIdsForColumn.splice(source.index, 1);
      taskIdsForColumn.splice(destination.index, 0, removed);
      const state = this.state;
      this.setState({
        ...state,
        columns: {
          ...state.columns,
          [start]: 
          {
            ...state.columns[start],
            taskIds: taskIdsForColumn 
          }
        }
      });
    } else {
      debugger;
      // Moving from one column to another
      const taskIdsForStartColumn = this.state.columns[start].taskIds.slice(0);
      const taskIdsForFinishColumn = this.state.columns[finish].taskIds.slice(0);
      taskIdsForStartColumn.splice(source.index, 1);
      taskIdsForFinishColumn.splice(destination.index, 0, draggableId);
      const newStart = {
        ...this.state.columns[start],
        taskIds: taskIdsForStartColumn
      }
      const newFinish = {
        ...this.state.columns[finish],
        taskIds: taskIdsForFinishColumn
      }
      this.setState({
        ...this.state,
        columns: {
          ...this.state.columns,
          [start]: newStart,
          [finish]: newFinish,
        }
      })
    }
    
  }

  onDragUpdate = (update) => {
    // console.log(update);
  }

  render() {
    return (
      <div className="App">
        <DragDropContext 
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
        >
          {this.state.columnIds.map((columnId) => {
            const column = this.state.columns[columnId];
            const taskIds = column.taskIds;
            return (
              <div className="column-wrapper" key={column.id}>
                <h3>{column.header}</h3>
                <Droppable droppableId={column.id} >
                {(provided, snapshot) => (
                  <Container
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    snapshot={snapshot}
                  >
                    {taskIds.map((taskId, index) => (
                      <Draggable
                        key={taskId}
                        draggableId={taskId}
                        index={index}
                        isDragDisabled={false}
                      >
                        {(provided, snapshot) => (
                          <Item
                              innerRef={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              snapshot={snapshot}
                            >
                              <Handle />
                              {this.state.tasks[taskId].text}
                          </Item>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            </div>
            )
          })}
        </DragDropContext>
      </div>
    );
  }
}

export default App;
