import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";

type Position = {
  x: number;
  y: number;
};

type Character = {
  id: number;
  position: Position;
  color: string;
};

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const CHAR_SIZE = 30;
const MOVE_DISTANCE = 5;

const Game: React.FC = () => {
  const [player, setPlayer] = useState<Position>({ x: 100, y: 100 });
  const [npcs, setNpcs] = useState<Character[]>([
    { id: 1, position: { x: 300, y: 300 }, color: "red" },
    { id: 2, position: { x: 500, y: 400 }, color: "blue" },
  ]);
  const [inCombat, setInCombat] = useState<boolean>(false);

  const movePlayer = (dx: number, dy: number) => {
    setPlayer((prev) => ({
      x: Math.max(0, Math.min(GAME_WIDTH - CHAR_SIZE, prev.x + dx)),
      y: Math.max(0, Math.min(GAME_HEIGHT - CHAR_SIZE, prev.y + dy)),
    }));
  };

  const checkCombat = () => {
    const inCombatZone = npcs.some(
      (npc) =>
        Math.abs(npc.position.x - player.x) < CHAR_SIZE &&
        Math.abs(npc.position.y - player.y) < CHAR_SIZE
    );
    setInCombat(inCombatZone);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -MOVE_DISTANCE);
          break;
        case "ArrowDown":
          movePlayer(0, MOVE_DISTANCE);
          break;
        case "ArrowLeft":
          movePlayer(-MOVE_DISTANCE, 0);
          break;
        case "ArrowRight":
          movePlayer(MOVE_DISTANCE, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    checkCombat();
  }, [player]);

  return (
    <div>
      <Stage width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Layer>
          <Rect
            x={player.x}
            y={player.y}
            width={CHAR_SIZE}
            height={CHAR_SIZE}
            fill="green"
          />
          {npcs.map((npc) => (
            <Circle
              key={npc.id}
              x={npc.position.x}
              y={npc.position.y}
              radius={CHAR_SIZE / 2}
              fill={npc.color}
            />
          ))}
        </Layer>
      </Stage>
      {inCombat && (
        <div style={{ position: "absolute", top: 10, left: 10, color: "red" }}>
          В бою!
        </div>
      )}
    </div>
  );
};

export default Game;
