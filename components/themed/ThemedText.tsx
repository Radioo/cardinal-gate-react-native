import { Text, type TextProps, type TextStyle, StyleSheet, type StyleProp } from 'react-native';
import useTheme from "@/hooks/useTheme";

type ThemedTextType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});

const typeStyles: Record<ThemedTextType, StyleProp<TextStyle>> = {
  default: styles.default,
  title: styles.title,
  defaultSemiBold: styles.defaultSemiBold,
  subtitle: styles.subtitle,
  link: styles.link,
};

export default function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme.text },
        typeStyles[type],
        type === 'link' ? { color: theme.tint } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
