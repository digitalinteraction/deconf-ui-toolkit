# deconf-ui-next

Thoughts on how to structure the next major version of the UI library.

## templates

These are the most specific, they take a configuration and render a whole view.
They should be wrapped in a styled `AppLayout` or `UtilLayout` by the client using them.

```vue
<template>
  <TimelineTemplate :config="config" />
  <GridTemplate :config="config" />
  <ContentTemplate :config="config" />
  <AtriumTemplate :config="config" />
  <SearchTemplate :options="options" />
</template>
```

## views

These are less specific, they take copy as slots and configuration as props.

```vue
<template>
  <TimelineView
    :schedule="schedule"
    :user-sessions="userSessions"
    storage-key="some-timeline"
    :date="scheduleDate"
    :options="options"
  >
    <template v-slot:title>Some timeline</template>
    <template v-slot:info>Use the filters below!</template>
    <template v-slot:noResults>Nothing matched that query</template>
  </TimelineView>

  <GridView
    :schedule="schedule"
    :user-sessions="userSessions"
    storage-key="some-grid"
    :date="scheduleDate"
    :options="options"
  >
    <template v-slot:title>Some grid</template>
    <template v-slot:info>Use the filters below!</template>
    <template v-slot:noResults>Nothing matched that query</template>
  </GridView>

  <ContentView :options="options">
    <BrandApiContent slot="some-content" />
  </ContentView>

  <AtriumView
    :schedule="schedule"
    :user-sessions="userSessions"
    :options="options"
  >
    <template v-slot:content>
      <BrandApiContent slot="atrium-content" />
    </template>
  </AtriumView>

  <ApiUnavailableView :options="options"> </ApiUnavailableView>

  <SearchView :schedule="schedule" :options="options" :date="scheduleDate" />
</template>
```

Clients should create their own `BrandApiContent` with their own slots for custom embeds,
like this:

```vue
<template>
  <ApiContent>
    <template v-slot:customthing>
      <p>Use %customThing% in markdown to render me</p>
    </template>
  </ApiContent>
</template>
```

## thoughts

- Can content come through in `config` or `options` rather then relying on the API?
- Could MySchedule view just be a `TimelineView` then?
