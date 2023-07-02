Refs track where object is being drawn. Check below object text if it’s filled then use those indexes to check board
On drag start on drag over
Prevent default
On drop

Click piece. Set state piece clicked. Click board. Check if empty. Drag. Check if empty. Drop. Check if empty. Set board.
Red has to be on row 3 horizontal

- context set up with board, selected piece
- pieces clickable and board udpating
- click and drag events to set pieces
- add rules to placement

- using a set with hashed x,y to track selected pieces on board
- need to add the constraints now

- represent entire board as hashed set using hash/unhash functions for ease
- update table rendering to use new hashed board

- using hashed board, need to figure out drag event issue - use refs?

- figured out board updating with hash
  - clear board of old pieces first then set
- handling two piece logic

- TODO handle collisions (if you over write any piece then just remove that entire piece)
- TODO handle 3 pieces
- TODO 2d board representation updated as well? Will need for the solves
- handle lowercase vertical uppercase horizontal

- collisions handled on board
- handle uppercase and lowercase

- add types everywhere(function returns etc), standardize function declarations of "row vs cell"
- clean up all code too

- handling upper and lowecase

- some drag up off table clearing extra
  - funny behavior when you are dragging and it goes off the table
  - fixed this clearing on table leave

- TODO fix diagonal placements... FACK
    - ultimately would like to just click a piece and drag it onto board
      - click to update orientation, place and check if legal