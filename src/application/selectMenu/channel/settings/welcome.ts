import {
  ActionRowBuilder,
  ChannelSelectMenuBuilder,
  channelMention,
  ChannelSelectMenuInteraction,
  EmbedBuilder,
  APIChannelSelectComponent,
  ButtonBuilder,
  APIButtonComponent,
} from "discord.js";
import {
  isCommandUser,
  emoji,
  reverse,
  status,
} from "../../../../helpers/utils";
import { Setting } from "../../../../models/Settings";

export async function run(interaction: ChannelSelectMenuInteraction<"cached">) {
  if (!isCommandUser(interaction)) return;

  const {
    guildId,
    values,
    message: { embeds, components },
  } = interaction;
  await interaction.deferReply({ ephemeral: true });

  const channelId = values[0];
  const data = await Setting.UpdateWelcome(guildId, { channelId });

  const embed = EmbedBuilder.from(embeds[0])
    .setDescription(
      `**»** **Status »»»** ${status(data?.enabled)}\n**»** **Channel »»»** ${data?.channelId ? channelMention(data.channelId) : "None"}`,
    )
    .setColor(data?.enabled ? "Blurple" : "Orange");

  const channelSelect = ActionRowBuilder.from(components[0]).setComponents(
    ChannelSelectMenuBuilder.from(
      components[0].components[0] as unknown as APIChannelSelectComponent,
    )
      .setDisabled(reverse(data?.enabled))
      .addDefaultChannels([channelId]),
  ) as ActionRowBuilder<ChannelSelectMenuBuilder>;

  const settingButtons = ActionRowBuilder.from(components[1]).setComponents(
    ButtonBuilder.from(components[1].components[0] as APIButtonComponent),
    ButtonBuilder.from(components[1].components[1] as APIButtonComponent),
  ) as ActionRowBuilder<ButtonBuilder>;

  await interaction.message.edit({
    embeds: [embed],
    components: [channelSelect, settingButtons],
  });

  return await interaction.editReply(`${emoji("Checkmark")} | Saved Settings!`);
}
