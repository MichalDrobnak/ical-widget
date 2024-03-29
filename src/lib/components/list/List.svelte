<script lang="ts">
  import type { IRoom } from '../../models/interfaces';

  export let currentDate: Date;
  export let room: IRoom;
</script>

<p>{currentDate} - {room.name}</p>
