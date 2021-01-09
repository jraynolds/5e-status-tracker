<template>
	<v-expand-transition>
		<v-container v-show="show">
			<v-row>
				<v-card-title>
					{{ title }}
				</v-card-title>
			</v-row>
			<v-row v-if="seeSources">
				<v-card-subtitle 
					class="text-left" 
					v-for="source of items" 
					:key="source.title"
				>
					{{ source.title + ":" }}
					<ul>
						<li v-for="(point, index) of source.points" :key="index">{{ point }}</li>
					</ul>
				</v-card-subtitle>
			</v-row>
			<v-row v-else>
				<v-card-subtitle class="text-left">
					<ul>
						<li v-for="(item, index) of items" :key="index">{{ item }}</li>
					</ul>
				</v-card-subtitle>
			</v-row>
			<v-row class="ml-0">
				<v-switch 
					style="transform: scale(.75);" 
					v-model="concise" 
					label="Concise mode"
					@change="$emit('update:concise', concise)" />
			</v-row>
		</v-container>
	</v-expand-transition>
</template>

<script>
export default {
	props: [ "show", "title", "items", "seeSources" ],
	data: () => ({
		concise: false
	})
}
</script>

<style>

</style>