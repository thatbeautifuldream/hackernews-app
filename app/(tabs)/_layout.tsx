import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(top)">
        <Icon sf="star.fill" />
        <Label>Top</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(new)">
        <Icon sf="newspaper.fill" />
        <Label>New</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(best)">
        <Icon sf="heart.fill" />
        <Label>Best</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(ask)">
        <Icon sf="questionmark.circle.fill" />
        <Label>Ask</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(show)">
        <Icon sf="eye.fill" />
        <Label>Show</Label>
      </NativeTabs.Trigger>
      {/* Note: Android NativeTabs supports max 5 tabs — Jobs tab may overflow on Android */}
      <NativeTabs.Trigger name="(job)">
        <Icon sf="briefcase.fill" />
        <Label>Jobs</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
