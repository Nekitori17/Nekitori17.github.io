<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);
	let time = $state('');

	function updateTime() {
		const now = new Date();
		const h = String(now.getHours()).padStart(2, '0');
		const m = String(now.getMinutes()).padStart(2, '0');
		const s = String(now.getSeconds()).padStart(2, '0');
		time = `${h}:${m}:${s}`;
	}

	onMount(() => {
		visible = true;
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<div
	class="relative flex flex-col justify-center items-center min-h-screen bg-black overflow-hidden select-none"
>
	<!-- Grid background -->
	<div class="grid-bg"></div>

	<!-- Scanline -->
	<div class="scanline"></div>

	<!-- Main content -->
	<div class="relative z-10 flex flex-col items-center" class:fade-in={visible}>
		<!-- Top status bar -->
		<div class="flex items-center gap-4 mb-12 text-[10px] tracking-[0.35em] uppercase hud-text">
			<span class="line-h w-12"></span>
			<span>SYS://STATUS.ACTIVE</span>
			<span class="line-h w-12"></span>
		</div>

		<!-- HUD Frame -->
		<div class="relative px-16 py-14 md:px-24 md:py-18">
			<!-- Corner brackets -->
			<div class="corner corner-tl"></div>
			<div class="corner corner-tr"></div>
			<div class="corner corner-bl"></div>
			<div class="corner corner-br"></div>

			<!-- Tick marks on edges -->
			<div class="tick tick-top"></div>
			<div class="tick tick-bottom"></div>
			<div class="tick tick-left"></div>
			<div class="tick tick-right"></div>

			<!-- Main heading -->
			<div class="text-center">
				<p class="text-[10px] tracking-[0.5em] uppercase hud-text mb-4">/// NOTICE ///</p>
				<h1
					class="text-3xl md:text-5xl font-extralight tracking-[0.4em] uppercase leading-relaxed primary-text"
				>
					UNDER
					<br />
					CONSTRUCTION
				</h1>
				<div class="flex items-center justify-center gap-3 mt-6">
					<span class="line-h w-6"></span>
					<span class="text-[10px] tracking-[0.4em] uppercase hud-text">SECTOR 17</span>
					<span class="line-h w-6"></span>
				</div>
			</div>
		</div>

		<!-- Status indicators -->
		<div class="flex items-center gap-6 mt-12 text-[10px] tracking-[0.3em] uppercase hud-text">
			<div class="flex items-center gap-2">
				<span class="status-dot"></span>
				<span>ONLINE</span>
			</div>
			<span class="opacity-30">│</span>
			<span>{time}</span>
			<span class="opacity-30">│</span>
			<div class="flex items-center gap-2">
				<span>SEC.LV</span>
				<span class="primary-text">██░░░</span>
			</div>
		</div>

		<!-- Bottom decorative line -->
		<div class="flex items-center gap-3 mt-10">
			<span class="line-h w-20 md:w-32"></span>
			<span class="diamond"></span>
			<span class="line-h w-20 md:w-32"></span>
		</div>

		<!-- Footer text -->
		<p class="mt-6 text-[9px] tracking-[0.5em] uppercase ghost-text">
			NEKITORI17 — ALL SYSTEMS NOMINAL
		</p>
	</div>

	<!-- Corner HUD overlays -->
	<div class="hud-corner hud-corner-tl">
		<span class="text-[8px] tracking-[0.3em] hud-text">LAT 00.000</span>
	</div>
	<div class="hud-corner hud-corner-tr">
		<span class="text-[8px] tracking-[0.3em] hud-text">NODE::PRIMARY</span>
	</div>
	<div class="hud-corner hud-corner-bl">
		<span class="text-[8px] tracking-[0.3em] hud-text">UPLINK ▓▓▓▓░</span>
	</div>
	<div class="hud-corner hud-corner-br">
		<span class="text-[8px] tracking-[0.3em] hud-text">v0.0.1</span>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400&display=swap');

	:global(body) {
		margin: 0;
		padding: 0;
	}

	/* Base color tokens */
	div {
		--hud-primary: #3fffb0;
		--hud-dim: rgba(63, 255, 176, 0.35);
		--hud-ghost: rgba(63, 255, 176, 0.12);
		--hud-glow: rgba(63, 255, 176, 0.06);
		font-family: 'JetBrains Mono', monospace;
	}

	/* Text variants */
	.primary-text {
		color: var(--hud-primary);
		text-shadow: 0 0 20px var(--hud-glow);
	}

	.hud-text {
		color: var(--hud-dim);
	}

	.ghost-text {
		color: var(--hud-ghost);
	}

	/* Grid background */
	.grid-bg {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--hud-ghost) 1px, transparent 1px),
			linear-gradient(90deg, var(--hud-ghost) 1px, transparent 1px);
		background-size: 60px 60px;
		opacity: 0.3;
	}

	/* Scanline effect */
	.scanline {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			transparent 0%,
			var(--hud-glow) 50%,
			transparent 100%
		);
		background-size: 100% 4px;
		pointer-events: none;
		opacity: 0.4;
		z-index: 5;
	}

	/* Horizontal lines */
	.line-h {
		display: inline-block;
		height: 1px;
		background: var(--hud-dim);
	}

	/* Corner brackets */
	.corner {
		position: absolute;
		width: 20px;
		height: 20px;
		border-color: var(--hud-dim);
		border-style: solid;
		border-width: 0;
	}

	.corner-tl {
		top: 0;
		left: 0;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.corner-tr {
		top: 0;
		right: 0;
		border-top-width: 1px;
		border-right-width: 1px;
	}

	.corner-bl {
		bottom: 0;
		left: 0;
		border-bottom-width: 1px;
		border-left-width: 1px;
	}

	.corner-br {
		bottom: 0;
		right: 0;
		border-bottom-width: 1px;
		border-right-width: 1px;
	}

	/* Tick marks */
	.tick {
		position: absolute;
		background: var(--hud-dim);
	}

	.tick-top,
	.tick-bottom {
		width: 1px;
		height: 8px;
		left: 50%;
	}

	.tick-top {
		top: 0;
	}

	.tick-bottom {
		bottom: 0;
	}

	.tick-left,
	.tick-right {
		height: 1px;
		width: 8px;
		top: 50%;
	}

	.tick-left {
		left: 0;
	}

	.tick-right {
		right: 0;
	}

	/* Status dot - blinking */
	.status-dot {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--hud-primary);
		box-shadow: 0 0 6px var(--hud-primary);
		animation: blink 2s ease-in-out infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.2;
		}
	}

	/* Diamond shape */
	.diamond {
		display: inline-block;
		width: 6px;
		height: 6px;
		background: var(--hud-dim);
		transform: rotate(45deg);
	}

	/* HUD corner info */
	.hud-corner {
		position: fixed;
		z-index: 20;
		padding: 20px;
	}

	.hud-corner-tl {
		top: 0;
		left: 0;
	}

	.hud-corner-tr {
		top: 0;
		right: 0;
	}

	.hud-corner-bl {
		bottom: 0;
		left: 0;
	}

	.hud-corner-br {
		bottom: 0;
		right: 0;
	}

	/* Fade in animation */
	.fade-in {
		animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
