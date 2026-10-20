# PokéSurvival — documento de diseño

PokéSurvival es un proyecto fan no oficial, derivado e inspirado en
[PokéSurvivor](https://github.com/JPTER78/pokesurvivor). Este documento describe
la versión que mantiene este repositorio; no reemplaza ni reclama autoría sobre
el proyecto original.

## Concepto

Juego de supervivencia para navegador, en español e inglés. El jugador elige un
Pokémon, esquiva oleadas y derrota enemigos mientras sus ataques se activan
automáticamente. La partida combina exploración, mejoras, jefes y juego
cooperativo.

## Progresión y combate

- Cada Pokémon recibe un ataque automático según sus tipos y rareza.
- Al subir de nivel se eligen mejoras generales de combate.
- Las mejoras de perforación y rebote son excluyentes.
- Los ataques cuerpo a cuerpo pueden obtener robo de vida.
- Bulbasaur, Ivysaur y Venusaur tienen pasivas propias y evolucionan durante la
  partida.

## Modos y servicios

- Partida individual y cooperativo online.
- Guardado local y sincronización en la nube mediante el Firebase de este
  proyecto.
- Hosting independiente en Firebase: `proyecto-pokemon2.web.app`.

## Aviso y licencias

Es un fan project no afiliado ni aprobado por Nintendo, Creatures Inc.,
GAME FREAK ni The Pokémon Company. Las condiciones de uso y la atribución
obligatoria del código derivado se detallan en [LICENSE](LICENSE) y
[LICENSE-NONCOMMERCIAL.md](LICENSE-NONCOMMERCIAL.md); los créditos de los sprites
están en [CREDITS.md](CREDITS.md).
